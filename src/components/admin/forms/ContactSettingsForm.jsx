'use client';

import AdminForm, { FormSection } from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField } from '@/components/admin/form/fields';
import { SOCIAL_NETWORKS } from '@/lib/constants/site';
import { saveContactSettings } from '@/actions/admin/contact';

export default function ContactSettingsForm({ settings }) {
  return (
    <AdminForm action={saveContactSettings} initialValues={settings} submitLabel="Save contact details">
      <div className="row g-4">
        <div className="col-xl-7">
          <FormSection title="Phone & email" description="Shown in the footer, the sidebar menu and the Contact page." icon="fa-regular fa-phone">
            <div className="row">
              <div className="col-md-6">
                <TextField name="contact.telephone" label="Telephone number" required maxLength={25} placeholder="+971 7 226 3131" />
              </div>
              <div className="col-md-6">
                <TextField name="contact.mobile" label="Mobile number" maxLength={25} placeholder="+971 55 2070846" help="Leave empty to hide it." />
              </div>
            </div>
            <TextField name="contact.email" label="Email address" type="email" required maxLength={191} />
            <TextField
              name="contact.whatsapp"
              label="WhatsApp number"
              maxLength={25}
              placeholder="+971 55 2070846"
              help="Shows a floating WhatsApp chat button on every page. Include the country code. Leave empty to hide the button."
              className="mb-0"
            />
          </FormSection>
          <FormSection title="Address & map" description="The address links to Google Maps; the embed is the map on the Contact page." icon="fa-regular fa-location-dot" className="mt-4">
            <TextAreaField name="contact.address" label="Address" required minLength={5} maxLength={300} rows={3} help="Each line is shown on its own line (max 5 lines)." />
            <TextField name="contact.map_url" label="Google Maps link" required maxLength={1000} placeholder="https://www.google.com/maps/place/..." help="Google Maps → Share → Copy link." />
            <TextAreaField
              name="contact.map_embed_url"
              label="Map embed link"
              required
              maxLength={1000}
              rows={3}
              help="Google Maps → Share → Embed a map → Copy HTML. You can paste the whole <iframe> code."
              className="mb-0"
            />
          </FormSection>
        </div>
        <div className="col-xl-5">
          <FormSection title="Social links" description="Icons in the footer and the sidebar menu. Leave a link empty to hide its icon." icon="fa-regular fa-share-nodes">
            {SOCIAL_NETWORKS.map((network, index) => (
              <TextField
                key={network.key}
                name={network.key}
                label={network.label}
                type="url"
                maxLength={500}
                placeholder="https://"
                className={index === SOCIAL_NETWORKS.length - 1 ? 'mb-0' : undefined}
              />
            ))}
          </FormSection>
        </div>
      </div>
    </AdminForm>
  );
}
