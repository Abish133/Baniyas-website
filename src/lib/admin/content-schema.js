import 'server-only';
import { z } from 'zod';
import { requiredText, jsonArray } from '@/lib/validation/fields';
import { FLATICON_ICONS } from '@/lib/constants/flaticons';
import { contentFields, EXTRA_CARD_ICONS } from '@/lib/content-config';

const CARD_ICONS = new Set([...FLATICON_ICONS, ...EXTRA_CARD_ICONS]);

const optionalText = (label, max) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be at most ${max} characters.`)
    .optional()
    .transform((v) => v || '');

const faqItem = z.object({
  question: requiredText('Question', { min: 5, max: 200 }),
  answer: requiredText('Answer', { min: 5, max: 2000 }),
});

const cardItem = z.object({
  icon: z.string().refine((v) => CARD_ICONS.has(v), { message: 'Pick an icon from the list.' }),
  title: requiredText('Card title', { min: 2, max: 60 }),
  text: requiredText('Card text', { min: 5, max: 400 }),
});

/** A JSON list field, stored as a JSON string. */
function listSchema(field, item, itemLabel) {
  return jsonArray(item, { label: itemLabel, max: field.max })
    .refine((list) => field.required === false || list.length > 0, { message: `Add at least one ${itemLabel.toLowerCase().replace(/s$/, '')}.` })
    .transform((list) => JSON.stringify(list));
}

function fieldSchema(field) {
  switch (field.type) {
    case 'faqs':
      return listSchema(field, faqItem, 'Questions');
    case 'cards':
      return listSchema(field, cardItem, 'Cards');
    default: {
      // text, textarea, paragraphs
      const base = field.required === false ? optionalText(field.label, field.max) : requiredText(field.label, { min: field.min ?? 2, max: field.max });
      if (field.type === 'text') return base.refine((v) => !v.includes('\n'), { message: `${field.label} must be a single line.` });
      return base.transform((v) => v.replace(/\r\n/g, '\n'));
    }
  }
}

const isFile = (field) => field.type === 'image' || field.type === 'video';

/** Zod schema for the text/list fields of one content page. */
export function contentPageSchema(pageKey) {
  return z.object(Object.fromEntries(contentFields(pageKey).filter((f) => !isFile(f)).map((f) => [f.key, fieldSchema(f)])));
}

export function contentFileFields(pageKey) {
  return contentFields(pageKey).filter(isFile);
}
