import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';
import { toParagraphs, toLines } from '@/lib/content-config';
import LineBreaks from '@/components/site/common/LineBreaks';

const DELAYS = ['.6s', '.8s', '1.0s'];

export default async function AboutIntro() {
  const s = await getSiteSettings();
  return (
    <div className="about__five section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-5 lg-mb-25">
            <div className="about__five-image wow img_left_animation">
              <img src={s['about.intro_image']} alt={s['about.intro_title']} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__five-right ml-70 xl-ml-0">
              <div className="about__five-right-title">
                <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['about.intro_subtitle']}</span>
                <h2 className="title_split_anim">{s['about.intro_title']}</h2>
              </div>
              <div className="features wow fadeInUp" data-wow-delay=".3s" style={{ backgroundImage: `url('${s['about.intro_badge_image']}')` }}>
                <h3>
                  <LineBreaks lines={toLines(s['about.intro_badge'])} />
                </h3>
              </div>
              {toParagraphs(s['about.intro_text']).map((text, index) => (
                <p className="wow fadeInUp" data-wow-delay={DELAYS[index] || '1s'} key={index}>
                  {text}
                </p>
              ))}
              <div className="item_bounce">
                <Link className="build_button mt-20" href="/portfolio">
                  {s['about.intro_button']}<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
