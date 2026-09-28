import { HOME_FAQS } from '@/lib/constants/home-faqs';

export default function HomeFaq() {
  return (
    <div className="faq__page section-padding">
      <div className="container">
        <h3 className="text-center mb-5">FAQs</h3>
        <div className="row jc-center">
          <div className="col-xl-10">
            <div className="wow fadeInUp" data-wow-delay=".4s" id="accordionExample">
              {HOME_FAQS.map((faq, index) => (
                <div className="faq-item" key={faq.id}>
                  <h5
                    className={`icon${index === 0 ? '' : ' collapsed'}`}
                    data-bs-toggle="collapse"
                    data-bs-target={`#${faq.id}`}
                  >
                    {faq.question}
                  </h5>
                  <div
                    id={faq.id}
                    className={`faq-item-body collapse${index === 0 ? ' show' : ''}`}
                    data-bs-parent="#accordionExample"
                  >
                    <p>{faq.intro}</p>
                    <ul>
                      {faq.points.map((point) => (
                        <li key={point.title}>
                          <strong>{point.title}</strong>{` ${point.text}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
