const VALUES = [
  { icon: 'flaticon-award', title: 'Excellence', delay: '.4s', text: 'We strive for excellence in quality and we continuously innovate utilizing advanced technologies.' },
  { icon: 'flaticon-team', title: 'Teamwork', delay: '.6s', text: "We insist on mutual respect, cooperation and mutual encouragement to achieve each individual's potential." },
  { icon: 'flaticon-handshake', title: 'Integrity', delay: '.8s', text: 'We act with reliability, honesty and fairness.' },
  { icon: 'fas fa-handshake', title: 'Commitment', delay: '1s', text: 'We are fully dedicated to delivering our objectives through the most efficient use of resources.' },
  { icon: 'fas fa-leaf', title: 'Sustainability', delay: '1.2s', text: 'We are committed to safeguarding all stakeholders, including especially the health and safety of our employees, society as a whole and the environment.' },
  { icon: 'fas fa-shield-alt', title: 'Accountability', delay: '1.4s', text: 'We are fully accountable for carrying out our responsibilities in accordance to the values and principles of Bani Yas Building Contg. LLC.' },
];

export default function CoreValues() {
  return (
    <div className="core-values__area section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Our Principles</span>
              <h2 className="title_split_anim">Our Core Values</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {VALUES.map((value) => (
            <div className="col-lg-4 col-md-6 mb-30" key={value.title}>
              <div className="core-value__item wow fadeInUp" data-wow-delay={value.delay}>
                <div className="core-value__icon">
                  <i className={value.icon}></i>
                </div>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
