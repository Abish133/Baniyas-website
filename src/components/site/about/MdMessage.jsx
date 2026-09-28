import { getSiteSettings } from '@/lib/content';
import { toParagraphs } from '@/lib/content-config';

const DELAYS = ['.6s', '.8s', '1s', '1.2s'];

export default async function MdMessage() {
  const s = await getSiteSettings();
  return (
    <div className="md-message__area section-padding">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['about.md_subtitle']}</span>
              <h2 className="title_split_anim">{s['about.md_title']}</h2>
            </div>
          </div>
        </div>
        <div className="row mb-40">
          <div className="col-lg-4 mx-auto text-center">
            <div
              className="md-image wow fadeInUp"
              data-wow-delay=".4s"
              style={{
                width: '220px',
                height: '220px',
                margin: '0 auto',
                borderRadius: '50%',
                border: '5px solid #f5a416',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src={s['about.md_image']}
                alt="Managing Director"
                className="img-fluid"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="md-message__content">
              <div className="md-message__quote wow fadeInUp" data-wow-delay=".4s">
                <i className="fas fa-quote-left"></i>
              </div>
              {toParagraphs(s['about.md_text']).map((text, index) => (
                <p className="wow fadeInUp" data-wow-delay={DELAYS[index] || '1.2s'} key={index}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
