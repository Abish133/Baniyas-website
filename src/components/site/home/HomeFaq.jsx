import { getSiteSettings } from '@/lib/content';
import { parseJsonList } from '@/lib/content-config';

/** "- Title: text" → <strong>Title:</strong> text (as on the original site). */
function BulletText({ text }) {
  const colon = text.indexOf(':');
  if (colon > 0 && colon <= 60) {
    return (
      <>
        <strong>{text.slice(0, colon + 1)}</strong>
        {text.slice(colon + 1)}
      </>
    );
  }
  return text;
}

/** Plain lines become paragraphs; consecutive "- " lines become one bullet list. */
function Answer({ text }) {
  const blocks = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last?.type === 'list') last.items.push(line.slice(2));
      else blocks.push({ type: 'list', items: [line.slice(2)] });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }
  return blocks.map((block, index) =>
    block.type === 'p' ? (
      <p key={index}>{block.text}</p>
    ) : (
      <ul key={index}>
        {block.items.map((item, i) => (
          <li key={i}>
            <BulletText text={item} />
          </li>
        ))}
      </ul>
    )
  );
}

export default async function HomeFaq() {
  const s = await getSiteSettings();
  const faqs = parseJsonList(s['home.faqs']);
  if (!faqs.length) return null;

  return (
    <div className="faq__page section-padding">
      <div className="container">
        <h3 className="text-center mb-5">{s['home.faq_title']}</h3>
        <div className="row jc-center">
          <div className="col-xl-10">
            <div className="wow fadeInUp" data-wow-delay=".4s" id="accordionExample">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <h5 className={`icon${index === 0 ? '' : ' collapsed'}`} data-bs-toggle="collapse" data-bs-target={`#faq-${index}`}>
                    {faq.question}
                  </h5>
                  <div id={`faq-${index}`} className={`faq-item-body collapse${index === 0 ? ' show' : ''}`} data-bs-parent="#accordionExample">
                    <Answer text={faq.answer} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
