import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';

/** Video banner + "Our Trusted Clients" logo marquee. */
export default async function HomeBanner({ clientsTitle, trustedClients }) {
  const s = await getSiteSettings();
  const video = s['home.banner_video'];
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
        <video autoPlay muted loop playsInline id="myVideo" key={video} poster={s['home.banner_poster']} preload="auto">
          <source src={video} type={video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        </video>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="banner__four-content">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['home.banner_subtitle']}</span>
              <div className="title_split_anim">
                <h1>{s['home.banner_title']}</h1>
                <h2>{s['home.banner_title2']}</h2>
              </div>
              <div className="item_bounce" style={{ display: 'inline-block', marginRight: '20px' }}>
                <Link className="build_button" href="/contact">
                  {s['home.banner_button1']}<i className="flaticon-right-up"></i>
                </Link>
              </div>{' '}
              <div className="item_bounce" style={{ display: 'inline-block' }}>
                <Link className="build_button banner-portfolio-btn" href="/portfolio">
                  {s['home.banner_button2']}<i className="flaticon-right-up"></i>
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
