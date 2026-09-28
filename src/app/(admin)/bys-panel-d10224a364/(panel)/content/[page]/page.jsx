import { notFound } from 'next/navigation';
import { settingsRepo } from '@/lib/repositories';
import { CONTENT_PAGES } from '@/lib/content-config';
import { saveContentPage } from '@/actions/admin/content';
import PageHeader from '@/components/admin/PageHeader';
import ContentPageForm from '@/components/admin/forms/ContentPageForm';

export async function generateMetadata({ params }) {
  const { page } = await params;
  return { title: CONTENT_PAGES[page]?.title || 'Page content' };
}

export default async function ContentPage({ params }) {
  const { page: pageKey } = await params;
  const page = CONTENT_PAGES[pageKey];
  if (!page) notFound();
  const settings = await settingsRepo.getSettings();
  return (
    <>
      <PageHeader title={page.title} description={page.description} siteHref={page.siteHref} />
      <ContentPageForm key={pageKey} pageKey={pageKey} settings={settings} action={saveContentPage.bind(null, pageKey)} />
    </>
  );
}
