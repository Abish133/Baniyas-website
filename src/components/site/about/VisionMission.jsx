import { getSiteSettings } from '@/lib/content';

export default async function VisionMission() {
  const s = await getSiteSettings();
  return (
    <div className="vision-mission__area section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{s['about.vm_subtitle']}</span>
              <h2 className="title_split_anim">{s['about.vm_title']}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 lg-mb-40">
            <div className="vision__area">
              <div className="vision__area-content">
                <div className="vision__area-icon mb-30">
                  <i className="flaticon-target"></i>
                </div>
                <h3 className="mb-25 wow fadeInUp" data-wow-delay=".4s">{s['about.vision_title']}</h3>
                <p className="wow fadeInUp" data-wow-delay=".6s" style={{ whiteSpace: 'pre-line' }}>
                  {s['about.vision_text']}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mission__area">
              <div className="mission__area-content">
                <div className="mission__area-icon mb-30">
                  <i className="flaticon-goal"></i>
                </div>
                <h3 className="mb-25 wow fadeInUp" data-wow-delay=".4s">{s['about.mission_title']}</h3>
                <p className="wow fadeInUp" data-wow-delay=".6s" style={{ whiteSpace: 'pre-line' }}>
                  {s['about.mission_text']}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
