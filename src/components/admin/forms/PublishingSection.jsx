'use client';

import { FormSection } from '@/components/admin/form/AdminForm';
import { NumberField, CheckboxField } from '@/components/admin/form/fields';

/** Side-column card with the visibility switch and sort order shared by every list section. */
export default function PublishingSection({ activeLabel = 'Show on website', activeHelp, children }) {
  return (
    <FormSection title="Publishing" description="Visibility and position on the website." icon="fa-regular fa-eye">
      <CheckboxField name="isActive" label={activeLabel} help={activeHelp} />
      <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} help="Lower numbers appear first." className="mb-0" />
      {children}
    </FormSection>
  );
}
