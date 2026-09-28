import Link from 'next/link';

/** Video banner + "Our Trusted Clients" logo marquee. */
export default function HomeBanner({ clientsTitle, trustedClients }) {
  const logoList = (
    <ul style={{ height: '100px', width: '100%' }}>
      {trustedClients.map((client) => (
        <li key={client.id}>
          <img src={client.logo} alt={client.name} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="banner__four">
      <div className="bg-video">
        <video autoPlay muted loop playsInline id="myVideo">
          <source src="/assets/img/banner/banner.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="banner__four-content">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">BANI YAS BUILDERS</span>
              <div className="title_split_anim">
                <h1>Shaping Futures</h1>
                <h2>Build to Last</h2>
              </div>
              <div className="item_bounce" style={{ display: 'inline-block', marginRight: '20px' }}>
                <Link className="build_button" href="/contact">
                  Start Today<i className="flaticon-right-up"></i>
                </Link>
              </div>{' '}
              <div className="item_bounce" style={{ display: 'inline-block' }}>
                <Link className="build_button banner-portfolio-btn" href="/portfolio">
                  visit Portfolio<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {trustedClients.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="banner__four-brand">
                <div className="title">
                  <h4 style={{ color: 'white' }}>{clientsTitle}</h4>
                </div>
                <div className="scroll__slider">
                  <div className="text-slide">
                    <div className="sliders text_scroll">{logoList}</div>
                    <div className="sliders text_scroll" aria-hidden="true">{logoList}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
