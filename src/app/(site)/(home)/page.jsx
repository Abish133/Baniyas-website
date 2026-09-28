import { pageMetadata } from '@/lib/seo';
import { getHomeContent } from '@/lib/content';
import HomeBanner from '@/components/site/home/HomeBanner';
import HomeAbout from '@/components/site/home/HomeAbout';
import HomeServices from '@/components/site/home/HomeServices';
import ProjectShowcase from '@/components/site/home/ProjectShowcase';
import HomeFaq from '@/components/site/home/HomeFaq';

// Content is managed in the admin panel, so always render fresh data.
export const dynamic = 'force-dynamic';
export const generateMetadata = () => pageMetadata('home');

export default async function HomePage() {
  const { settings, trustedClients, stats, services, projects } = await getHomeContent();
  return (
    <>
      <HomeBanner clientsTitle={settings['home.trusted_clients_title']} trustedClients={trustedClients} />
      <HomeAbout stats={stats} />
      <HomeServices
        subtitle={settings['home.services_subtitle']}
        title={settings['home.services_title']}
        image={settings['home.services_image']}
        services={services}
      />
      <ProjectShowcase projects={projects} />
      <HomeFaq />
    </>
  );
}
