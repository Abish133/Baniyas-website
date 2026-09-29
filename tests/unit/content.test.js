import { describe, expect, it } from 'vitest';
import { CONTENT_PAGE_KEYS, CONTENT_DEFAULTS, contentFields, toParagraphs, toLines, parseJsonList } from '@/lib/content-config';
import { contentPageSchema } from '@/lib/admin/content-schema';
import { IMAGE_RULES, VIDEO_RULES } from '@/lib/validation/image-rules';

const isFile = (field) => field.type === 'image' || field.type === 'video';

describe('Page content configuration', () => {
  // Guards against defaults that the admin could not save (e.g. a description longer than its limit).
  it.each(CONTENT_PAGE_KEYS)('the original content of "%s" passes its own validation', (page) => {
    const values = Object.fromEntries(contentFields(page).filter((f) => !isFile(f)).map((f) => [f.key, CONTENT_DEFAULTS[f.key]]));
    const result = contentPageSchema(page).safeParse(values);
    expect(result.success ? {} : result.error.issues).toEqual({});
  });

  it('every image/video field points to existing upload rules', () => {
    for (const page of CONTENT_PAGE_KEYS) {
      for (const field of contentFields(page).filter(isFile)) {
        const rules = field.type === 'video' ? VIDEO_RULES[field.rules] : IMAGE_RULES[field.rules];
        expect(rules, `${field.key} → ${field.rules}`).toBeTruthy();
      }
    }
  });

  it('setting keys are unique across pages', () => {
    const keys = CONTENT_PAGE_KEYS.flatMap((page) => contentFields(page).map((f) => f.key));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('rejects an invalid FAQ list', () => {
    const values = Object.fromEntries(contentFields('home').filter((f) => !isFile(f)).map((f) => [f.key, CONTENT_DEFAULTS[f.key]]));
    values['home.faqs'] = JSON.stringify([{ question: 'x', answer: '' }]);
    const result = contentPageSchema('home').safeParse(values);
    expect(result.success).toBe(false);
    expect(result.error.issues.map((i) => i.path.join('.'))).toContain('home.faqs.0.question');
  });

  it('rejects a card icon that is not in the icon list', () => {
    const values = Object.fromEntries(contentFields('about').filter((f) => !isFile(f)).map((f) => [f.key, CONTENT_DEFAULTS[f.key]]));
    values['about.values'] = JSON.stringify([{ icon: 'evil"><script>', title: 'Excellence', text: 'We strive for excellence.' }]);
    expect(contentPageSchema('about').safeParse(values).success).toBe(false);
  });

  it('text helpers split paragraphs, lines and JSON lists', () => {
    expect(toParagraphs('One\n\nTwo\n \nThree')).toEqual(['One', 'Two', 'Three']);
    expect(toLines(' a \n\n b ')).toEqual(['a', 'b']);
    expect(parseJsonList('not json')).toEqual([]);
    expect(parseJsonList('[1,2]')).toEqual([1, 2]);
  });
});
