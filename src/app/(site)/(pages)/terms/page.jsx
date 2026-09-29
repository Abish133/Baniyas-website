import LegalPage from '@/components/site/common/LegalPage';

export const metadata = { title: 'Terms & Conditions', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return <LegalPage settingKey="legal.terms" title="Terms & Conditions" />;
}
