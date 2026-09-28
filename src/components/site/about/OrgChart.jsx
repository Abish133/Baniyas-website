import { getSiteSettings } from '@/lib/content';
import { toParagraphs } from '@/lib/content-config';

export default async function OrgChart() {
  const s = await getSiteSettings();
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-xl-12">
          <div className="section-title t-center">
            <h2 className="wow fadeInLeft" data-wow-delay=".4s">{s['about.org_heading']}</h2>
          </div>
        </div>
      </div>
      <section className="custom-section py-5">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 lg-mb-25">
              <div className="success__area-title mr-70 xl-mr-0">
                <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['about.org_subtitle']}</span>
                <h2 className="title_split_anim mb-20">{s['about.org_title']}</h2>
                {toParagraphs(s['about.org_text']).map((text, index) => (
                  <p className="wow fadeInUp" data-wow-delay=".4s" key={index}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-md-6 image-column text-center">
              <img src={s['about.org_image']} alt={s['about.org_heading']} className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
