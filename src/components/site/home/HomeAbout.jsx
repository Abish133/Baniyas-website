import Link from 'next/link';
import Counter from '@/components/site/effects/Counter';
import { getSiteSettings } from '@/lib/content';

// Column alignment classes from the original 3-column counter row.
const COUNTER_CLASSES = [
  'about__four-counter-item',
  'about__four-counter-item borders t-center md-t-left',
  'about__four-counter-item t-right md-t-left',
];
const COUNTER_DELAYS = ['.4s', '.7s', '1s'];

export default async function HomeAbout({ stats }) {
  const s = await getSiteSettings();
  return (
    <div className="about__four section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-9">
            <div className="about__four-title">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['home.about_subtitle']}</span>
              <h2 className="title_split_anim mb-20">{s['home.about_title']}</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s" style={{ whiteSpace: 'pre-line' }}>
                {s['home.about_text']}
              </p>
              <div className="item_bounce">
                <Link className="build_button mt-25" href="/about">
                  {s['home.about_button']}<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-lg-8">
            <div className="about__four-counter">
              <div className="row">
                {stats.map((stat, index) => (
                  <div className="col-md-4 col-sm-6 wow fadeInUp" data-wow-delay={COUNTER_DELAYS[index] || '1s'} key={stat.id}>
                    <div className={COUNTER_CLASSES[index] || COUNTER_CLASSES[2]}>
                      <div className="box">
                        <h2>
                          <Counter value={stat.value} />
                          {stat.suffix}
                        </h2>
                        <span>{stat.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 lg-mt-25">
            <div className="about__four-right t-right wow img_right_animation">
              <img src={s['home.about_image']} alt={s['home.about_title']} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
