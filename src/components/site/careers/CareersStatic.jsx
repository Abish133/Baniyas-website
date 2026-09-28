export function CareersIntro() {
  return (
    <div className="careers__intro section-padding">
      <div className="container">
        <div className="row al-center">
          <div className="col-lg-6 lg-mb-25">
            <div className="careers__intro-content">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Join Our Team</span>
              <h2 className="title_split_anim">Build Your Future With Us</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                At Bani Yas Building Contg. LLC, we believe our people are our greatest asset. Join a team of dedicated
                professionals who are passionate about creating exceptional construction projects and building lasting
                careers.
              </p>
              <p className="wow fadeInUp" data-wow-delay=".8s">
                We offer competitive compensation, comprehensive benefits, and opportunities for professional growth in a
                dynamic work environment.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="careers__intro-image wow img_right_animation">
              <img src="/assets/img/team/team-1.jpg" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  { icon: 'flaticon-team', title: 'Professional Growth', text: 'Continuous learning opportunities and career advancement programs', delay: '.4s' },
  { icon: 'flaticon-medical', title: 'Health Insurance', text: 'Comprehensive medical coverage for you and your family', delay: '.6s' },
  { icon: 'flaticon-clock', title: 'Work-Life Balance', text: 'Flexible working arrangements and generous vacation time', delay: '.8s' },
];

export function EmployeeBenefits() {
  return (
    <div className="benefits__area section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Why Choose Us</span>
              <h2 className="title_split_anim">Employee Benefits</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {BENEFITS.map((benefit) => (
            <div className="col-lg-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay={benefit.delay} key={benefit.title}>
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
