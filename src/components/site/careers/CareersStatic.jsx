import { getSiteSettings } from '@/lib/content';
import { toParagraphs, parseJsonList } from '@/lib/content-config';

const INTRO_DELAYS = ['.6s', '.8s', '1s'];

export async function CareersIntro() {
  const s = await getSiteSettings();
  return (
    <div className="careers__intro section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-6 lg-mb-25">
            <div className="careers__intro-content">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['careers.intro_subtitle']}</span>
              <h2 className="title_split_anim">{s['careers.intro_title']}</h2>
              {toParagraphs(s['careers.intro_text']).map((text, index) => (
                <p className="wow fadeInUp" data-wow-delay={INTRO_DELAYS[index] || '1s'} key={index}>
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="careers__intro-image wow img_right_animation">
              <img src={s['careers.intro_image']} alt={s['careers.intro_title']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Staggered entrance animation, as on the original site.
const delay = (index) => `${(0.4 + index * 0.2).toFixed(1)}s`;

export async function EmployeeBenefits() {
  const s = await getSiteSettings();
  const benefits = parseJsonList(s['careers.benefits']);
  if (!benefits.length) return null;

  return (
    <div className="benefits__area section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['careers.benefits_subtitle']}</span>
              <h2 className="title_split_anim">{s['careers.benefits_title']}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {benefits.map((benefit, index) => (
            <div className="col-lg-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay={delay(index)} key={index}>
              <div className="benefit__item t-center">
                <i className={benefit.icon}></i>
                <h4>{benefit.title}</h4>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
