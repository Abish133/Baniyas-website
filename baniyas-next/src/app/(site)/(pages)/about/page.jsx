import { getAboutContent } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import AboutIntro from '@/components/site/about/AboutIntro';
import VisionMission from '@/components/site/about/VisionMission';
import MdMessage from '@/components/site/about/MdMessage';
import CoreValues from '@/components/site/about/CoreValues';
import OrgChart from '@/components/site/about/OrgChart';
import ClientsGrid from '@/components/site/about/ClientsGrid';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const { settings, clients } = await getAboutContent();
  return (
    <>
      <Breadcrumb title="About Us" />
      <AboutIntro />
      <VisionMission />
      <MdMessage />
      <CoreValues />
      <OrgChart />
      <ClientsGrid subtitle={settings['about.clients_subtitle']} title={settings['about.clients_title']} clients={clients} />
    </>
  );
}
