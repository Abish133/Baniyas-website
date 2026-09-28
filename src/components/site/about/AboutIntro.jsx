import Link from 'next/link';

export default function AboutIntro() {
  return (
    <div className="about__five section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-5 lg-mb-25">
            <div className="about__five-image wow img_left_animation">
              <img src="/assets/img/about/about-4.jpg" alt="image" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__five-right ml-70 xl-ml-0">
              <div className="about__five-right-title">
                <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">About Our Company</span>
                <h2 className="title_split_anim">Trusted Partner in Construction and Design</h2>
              </div>
              <div className="features wow fadeInUp" data-wow-delay=".3s" style={{ backgroundImage: "url('/assets/img/page/portfolio-8.jpg')" }}>
                <h3>
                  Building Trust
                  <br />
                  Since 2008
                </h3>
              </div>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                At Bani Yas Building Contg. LLC, we are a dedicated multidisciplinary civil engineering construction company
                with proven capabilities over a wide range of different technical fields in the Civil Engineering Industry
                since 2008. Bani Yas has established itself over the years since then. We have built a reputation for
                quality, safety and precision across sectors such as manufacturing, energy, logistics and processing.
              </p>
              <p className="wow fadeInUp" data-wow-delay=".8s">
                Our team of seasoned engineers, project managers, and skilled tradespeople bring deep expertise in complex
                industrial projects - from large scale factories and warehouses to specialized plants and infrastructure. We
                understand the critical importance of operational efficiency, regulatory compliance and safety standards in
                industrial environments and we build with those priorities in mind.
              </p>
              <p className="wow fadeInUp" data-wow-delay="1.0s">
                With a commitment to innovation, sustainability and on-time delivery, Bani Yas Building Contg. LLC is a
                trusted partner for industrial clients who demand excellence. We don&apos;t just build facilities - we build
                the future of industry.
              </p>
              <div className="item_bounce">
                <Link className="build_button mt-20" href="/portfolio">
                  See Projects<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
