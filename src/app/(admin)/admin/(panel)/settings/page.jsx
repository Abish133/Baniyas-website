import { settingsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import SettingsForm from '@/components/admin/forms/SettingsForm';

export const metadata = { title: 'Section Headings' };

export default async function SettingsPage() {
  const settings = await settingsRepo.getSettings();
  return (
    <>
      <PageHeader title="Section Headings" description="Headings and the image of the dynamic sections." />
      <SettingsForm settings={settings} />
    </>
  );
}
