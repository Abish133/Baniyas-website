import { z } from 'zod';

// Reusable field builders with consistent, readable error messages.

export function requiredText(label, { min = 2, max }) {
  return z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be at most ${max} characters.`);
}

/** Optional text: empty strings become null. */
export function optionalText(label, { max }) {
  return z
    .string()
    .trim()
    .max(max, `${label} must be at most ${max} characters.`)
    .optional()
    .nullable()
    .transform((value) => (value ? value : null));
}

export const checkbox = z.preprocess(
  (value) => value === 'on' || value === 'true' || value === '1' || value === true,
  z.boolean()
);

export const sortOrder = z.coerce
  .number({ error: 'Sort order must be a number.' })
  .int('Sort order must be a whole number.')
  .min(0, 'Sort order cannot be negative.')
  .max(9999, 'Sort order must be 9999 or less.');

/** Parses a JSON string posted by a repeater field. */
export function jsonArray(itemSchema, { label, max }) {
  return z.preprocess(
    (value) => {
      if (Array.isArray(value)) return value;
      if (typeof value !== 'string' || value.trim() === '') return [];
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    },
    z.array(itemSchema, { error: `${label} are invalid.` }).max(max, `You can add at most ${max} ${label.toLowerCase()}.`)
  );
}

/** Turns a ZodError into { field: firstMessage }. */
export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path.length ? issue.path.join('.') : '_form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
