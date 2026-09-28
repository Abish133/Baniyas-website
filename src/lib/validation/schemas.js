import { z } from 'zod';
import { FLATICON_ICONS } from '@/lib/constants/flaticons';
import { requiredText, optionalText, checkbox, sortOrder, jsonArray } from './fields';

// ---------------------------------------------------------------------------
// Limits that the layouts depend on (enforced in the Server Actions).
// ---------------------------------------------------------------------------
export const LIMITS = {
  trustedClientsActive: 20,
  homeStatsActive: 3, // 3-column counter row
  homeProjectsActive: 6, // hover-expand strip
  serviceBenefits: 10,
  serviceFaqs: 10,
  jobRequirementLines: 10,
};

export const loginSchema = z.object({
  email: z.email('Enter a valid email address.').trim().toLowerCase().max(191),
  password: z.string().min(1, 'Password is required.').max(128, 'Password is too long.'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters.')
      .max(64, 'New password must be at most 64 characters.')
      .regex(/[A-Za-z]/, 'New password must contain a letter.')
      .regex(/[0-9]/, 'New password must contain a number.'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export const profileSchema = z.object({
  name: requiredText('Name', { min: 2, max: 80 }),
  email: z.email('Enter a valid email address.').trim().toLowerCase().max(191),
});

export const trustedClientSchema = z.object({
  name: requiredText('Client name', { min: 2, max: 120 }),
  isActive: checkbox,
  sortOrder,
});

export const homeStatSchema = z.object({
  label: requiredText('Label', { min: 2, max: 40 }),
  value: z.coerce
    .number({ error: 'Value must be a number.' })
    .int('Value must be a whole number.')
    .min(0, 'Value cannot be negative.')
    .max(999999, 'Value must be 999,999 or less.'),
  suffix: z
    .string()
    .trim()
    .max(5, 'Suffix must be at most 5 characters.')
    .regex(/^[^<>]*$/, 'Suffix contains invalid characters.')
    .optional()
    .transform((v) => v ?? ''),
  isActive: checkbox,
  sortOrder,
});

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(120, 'Slug must be at most 120 characters.')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug may contain only lowercase letters, numbers and single hyphens.')
  .optional()
  .or(z.literal('').transform(() => undefined));

export const serviceSchema = z
  .object({
    cardTitle: requiredText('Card title', { min: 2, max: 40 }),
    title: requiredText('Page title', { min: 2, max: 80 }),
    slug: slugSchema,
    icon: z.enum(FLATICON_ICONS, { error: 'Choose an icon from the list.' }),
    showOnHome: checkbox,
    showOnPage: checkbox,
    isActive: checkbox,
    sortOrder,
    description1: optionalText('Intro paragraph', { max: 2000 }),
    description2: optionalText('Second paragraph', { max: 2000 }),
    subtitle: optionalText('Sub heading', { max: 150 }),
    mainContent: optionalText('Main content', { max: 3000 }),
    finalDescription: optionalText('Closing paragraph', { max: 2000 }),
    benefits: jsonArray(
      z.string().trim().min(3, 'Each benefit must be at least 3 characters.').max(200, 'Each benefit must be at most 200 characters.'),
      { label: 'Benefits', max: LIMITS.serviceBenefits }
    ),
    faqs: jsonArray(
      z.object({
        question: z.string().trim().min(5, 'Each question must be at least 5 characters.').max(200, 'Each question must be at most 200 characters.'),
        answer: z.string().trim().min(5, 'Each answer must be at least 5 characters.').max(1000, 'Each answer must be at most 1000 characters.'),
      }),
      { label: 'FAQs', max: LIMITS.serviceFaqs }
    ),
  })
  .superRefine((data, ctx) => {
    if (!data.showOnHome && !data.showOnPage) {
      ctx.addIssue({ code: 'custom', path: ['showOnHome'], message: 'Show the service on the home slider, the services page, or both.' });
    }
    if (data.showOnPage) {
      const required = [
        ['description1', 'Intro paragraph'],
        ['subtitle', 'Sub heading'],
        ['mainContent', 'Main content'],
      ];
      for (const [key, label] of required) {
        if (!data[key]) ctx.addIssue({ code: 'custom', path: [key], message: `${label} is required when the service is shown on the services page.` });
      }
      if (data.description1 && data.description1.length < 20) {
        ctx.addIssue({ code: 'custom', path: ['description1'], message: 'Intro paragraph must be at least 20 characters.' });
      }
    }
  });

export const homeProjectSchema = z.object({
  title: requiredText('Project title', { min: 2, max: 80 }),
  location: requiredText('Location', { min: 2, max: 60 }),
  isActive: checkbox,
  sortOrder,
});

export const portfolioProjectSchema = z.object({
  caption: requiredText('Caption', { min: 3, max: 200 }),
  isActive: checkbox,
  sortOrder,
});

export const clientSchema = z.object({
  name: requiredText('Client name', { min: 2, max: 120 }),
  isActive: checkbox,
  sortOrder,
});

export const jobSchema = z.object({
  title: requiredText('Job title', { min: 2, max: 100 }),
  jobType: requiredText('Job type', { min: 2, max: 40 }),
  location: requiredText('Location', { min: 2, max: 100 }),
  experience: requiredText('Experience', { min: 2, max: 60 }),
  requirements: z
    .string()
    .trim()
    .max(1500, 'Requirements must be at most 1500 characters.')
    .optional()
    .transform((v) => v || null)
    .refine((v) => !v || v.split('\n').filter((l) => l.trim()).length <= LIMITS.jobRequirementLines, {
      message: `Add at most ${LIMITS.jobRequirementLines} requirement lines.`,
    })
    .refine((v) => !v || v.split('\n').every((l) => l.trim().length <= 150), {
      message: 'Each requirement line must be at most 150 characters.',
    }),
  applyLink: z
    .string()
    .trim()
    .max(255, 'Apply link must be at most 255 characters.')
    .refine((v) => !v || /^(https?:\/\/|mailto:|\/)[^\s<>"]*$/i.test(v), {
      message: 'Apply link must start with https://, mailto: or / (site path).',
    })
    .optional()
    .transform((v) => v || null),
  isActive: checkbox,
  sortOrder,
});

export const settingsSchema = z.object({
  'home.trusted_clients_title': requiredText('Trusted clients heading', { min: 2, max: 40 }),
  'home.services_subtitle': requiredText('Services sub heading', { min: 2, max: 40 }),
  'home.services_title': requiredText('Services heading', { min: 2, max: 80 }),
  'about.clients_subtitle': requiredText('Clients badge text', { min: 2, max: 30 }),
  'about.clients_title': requiredText('Clients heading', { min: 2, max: 60 }),
});

export const contactSchema = z.object({
  name: requiredText('Full name', { min: 2, max: 100 }),
  email: z.email('Enter a valid email address.').trim().max(191, 'Email is too long.'),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => !v || /^[+0-9()\s-]{6,20}$/.test(v), { message: 'Enter a valid phone number.' })
    .optional()
    .transform((v) => v || null),
  message: z
    .string()
    .trim()
    .max(2000, 'Message must be at most 2000 characters.')
    .optional()
    .transform((v) => v || null),
});
