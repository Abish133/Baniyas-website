import Link from 'next/link';
import ServicesSlider from './ServicesSlider';

export default function HomeServices({ subtitle, title, image, services }) {
  return (
    <div className="services__four section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 lg-mb-25">
            <div className="services__four-title section-padding pb-0">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{subtitle}</span>
              {/* SplitText rewrites this markup, so a changed heading must replace the element. */}
              <h2 className="title_split_anim" key={title}>{title}</h2>
              <div className="item_bounce">
                <Link className="build_button mt-40" href="/services">
                  Learn more<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="services__four-image wow img_top_animation">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
        {services.length > 0 && (
          <div className="row mt-70 wow fadeInUp" data-wow-delay=".5s">
            <div className="col-xl-12">
              <ServicesSlider services={services} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
