const PARAGRAPHS = [
  ['.6s', 'We believe that hard work combined with smart work is the key to success. Through these years our company has come through a lot of ups and downs and has carved a niche out for itself in the construction and engineering landscape and emerged as one of the top construction companies in Ras Al Khaimah.'],
  ['.8s', 'Bani Yas Building Contg. LLC has earned a reputation among its clients for its reliability and integrity towards the work. Bani Yas Building Contg. LLC has the capability and accountability to timely deliver the projects to clients with the highest standard of quality, also exceeding their expectations. We also upgrade ourselves with the latest tools and machinery to complete the projects efficiently and effectively.'],
  ['1s', 'We have achieved this success because of the dedication and hard work of our employees and workers towards their work. They have contributed more for the growth and development of the company.'],
  ['1.2s', 'We would like to thank our valued clients for their unending support and employees for their cooperation and hard work in making the Bani Yas Building Contg. LLC success possible. Looking forward, the aim of Bani Yas Building Contg. LLC is to continue providing quality construction with innovative ideas, adopt better management and construction techniques.'],
];

export default function MdMessage() {
  return (
    <div className="md-message__area section-padding">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Leadership</span>
              <h2 className="title_split_anim">Message from Managing Director</h2>
            </div>
          </div>
        </div>
        <div className="row mb-40">
          <div className="col-lg-4 mx-auto text-center">
            <div
              className="md-image wow fadeInUp"
              data-wow-delay=".4s"
              style={{
                width: '220px',
                height: '220px',
                margin: '0 auto',
                borderRadius: '50%',
                border: '5px solid #f5a416',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src="/assets/img/about/MD.jpeg"
                alt="Managing Director"
                className="img-fluid"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="md-message__content">
              <div className="md-message__quote wow fadeInUp" data-wow-delay=".4s">
                <i className="fas fa-quote-left"></i>
              </div>
              {PARAGRAPHS.map(([delay, text]) => (
                <p className="wow fadeInUp" data-wow-delay={delay} key={delay}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
