import LegalPage from '@/components/site/common/LegalPage';

export const metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <LegalPage settingKey="legal.privacy" title="Privacy Policy" />;
}
