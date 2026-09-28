import { notFound } from 'next/navigation';
import { getSiteSettings } from '@/lib/content';
import { toParagraphs } from '@/lib/content-config';
import Breadcrumb from './Breadcrumb';

/** Terms / Privacy page from the "Legal pages" settings. Empty text → 404. */
export default async function LegalPage({ settingKey, title }) {
  const s = await getSiteSettings();
  const blocks = toParagraphs(s[settingKey]);
  if (!blocks.length) notFound();

  return (
    <>
      <Breadcrumb title={title} />
      <div className="section-padding">
        <div className="container">
          <div className="legal__content">
            {blocks.map((block, index) =>
              block.startsWith('## ') ? <h3 key={index}>{block.slice(3)}</h3> : <p key={index}>{block}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
