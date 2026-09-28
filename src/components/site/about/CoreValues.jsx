import { getSiteSettings } from '@/lib/content';
import { parseJsonList } from '@/lib/content-config';

// Staggered entrance animation, as on the original site.
const delay = (index) => `${(0.4 + index * 0.2).toFixed(1)}s`;

export default async function CoreValues() {
  const s = await getSiteSettings();
  const values = parseJsonList(s['about.values']);
  if (!values.length) return null;

  return (
    <div className="core-values__area section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['about.values_subtitle']}</span>
              <h2 className="title_split_anim">{s['about.values_title']}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {values.map((value, index) => (
            <div className="col-lg-4 col-md-6 mb-30" key={index}>
              <div className="core-value__item wow fadeInUp" data-wow-delay={delay(index)}>
                <div className="core-value__icon">
                  <i className={value.icon}></i>
                </div>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
