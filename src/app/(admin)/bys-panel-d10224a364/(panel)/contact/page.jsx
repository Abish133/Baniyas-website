import { settingsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import ContactSettingsForm from '@/components/admin/forms/ContactSettingsForm';

export const metadata = { title: 'Contact Details' };

export default async function ContactSettingsPage() {
  const settings = await settingsRepo.getSettings();
  return (
    <>
      <PageHeader siteHref="/contact" title="Contact Details" description="Phone numbers, email, address, map and social links used across the website." />
      <ContactSettingsForm settings={settings} />
    </>
  );
}
