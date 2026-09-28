import Link from 'next/link';
import Counter from '@/components/site/effects/Counter';

// Column alignment classes from the original 3-column counter row.
const COUNTER_CLASSES = [
  'about__four-counter-item',
  'about__four-counter-item borders t-center md-t-left',
  'about__four-counter-item t-right md-t-left',
];
const COUNTER_DELAYS = ['.4s', '.7s', '1s'];

export default function HomeAbout({ stats }) {
  return (
    <div className="about__four section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-9">
            <div className="about__four-title">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">About Our Company</span>
              <h2 className="title_split_anim mb-20">Welcome to Bani Yas Builders</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s">
                Bani Yas Building Contg LLC is a multidisciplinary Civil Engineering Construction company with proven
                capabilities over a wide range of different technical fields in the Civil Engineering Industry since 2008.
              </p>
              <div className="item_bounce">
                <Link className="build_button mt-25" href="/about">
                  Our Story<i className="flaticon-right-up"></i>
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
              <img src="/assets/img/about/about-6.png" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
