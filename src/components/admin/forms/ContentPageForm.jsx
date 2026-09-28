'use client';

import AdminForm, { FormSection, useFormField } from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import VideoField from '@/components/admin/form/VideoField';
import CardListField from '@/components/admin/form/CardListField';
import { FaqField } from '@/components/admin/form/RepeaterFields';
import { CONTENT_PAGES } from '@/lib/content-config';
import { IMAGE_RULES, VIDEO_RULES } from '@/lib/validation/image-rules';

/** Upload fields show the stored file (also right after a save). */
function StoredImageField({ field }) {
  const { value } = useFormField(field.key);
  return <ImageField name={field.key} label={field.label} rules={IMAGE_RULES[field.rules]} currentUrl={value} />;
}

function StoredVideoField({ field }) {
  const { value } = useFormField(field.key);
  return <VideoField name={field.key} label={field.label} rules={VIDEO_RULES[field.rules]} currentUrl={value} />;
}

function ContentField({ field }) {
  const required = field.required !== false;
  switch (field.type) {
    case 'image':
      return <StoredImageField field={field} />;
    case 'video':
      return <StoredVideoField field={field} />;
    case 'faqs':
      return <FaqField name={field.key} label={field.label} help={field.help} max={field.max} answerMax={2000} />;
    case 'cards':
      return <CardListField name={field.key} label={field.label} help={field.help} max={field.max} />;
    case 'textarea':
    case 'paragraphs':
      return (
        <TextAreaField
          name={field.key}
          label={field.label}
          required={required}
          maxLength={field.max}
          rows={field.rows || 4}
          help={field.help || (field.type === 'paragraphs' ? 'Leave a blank line between paragraphs.' : undefined)}
        />
      );
    default:
      return <TextField name={field.key} label={field.label} required={required} minLength={required ? 2 : undefined} maxLength={field.max} help={field.help} />;
  }
}

export default function ContentPageForm({ pageKey, settings, action }) {
  const page = CONTENT_PAGES[pageKey];
  return (
    <AdminForm action={action} initialValues={settings} submitLabel="Save changes">
      <div className="d-flex flex-column gap-4">
        {page.sections.map((section) => (
          <FormSection key={section.title} title={section.title} description={section.description} icon={section.icon}>
            <div className="row">
              {section.fields.map((field) => (
                <div className={field.col || 'col-12'} key={field.key}>
                  <ContentField field={field} />
                </div>
              ))}
            </div>
          </FormSection>
        ))}
      </div>
    </AdminForm>
  );
}
