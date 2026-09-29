'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ServiceContent({ service }) {
  const hasDetailImages = service.detailImage1 || service.detailImage2;
  return (
    <>
      {service.image && <img src={service.image} alt={service.title} />}
      <h3 className="mt-25 mb-20">{service.title}</h3>
      {service.description1 && <p className="mb-20">{service.description1}</p>}
      {service.description2 && <p className="mb-25">{service.description2}</p>}
      {service.subtitle && <h4 className="mb-20">{service.subtitle}</h4>}
      {service.mainContent && <p>{service.mainContent}</p>}
      {hasDetailImages && (
        <div className="row mt-40 mb-40">
          {service.detailImage1 && (
            <div className="col-sm-6 sm-mb-25">
              <img className="img_full" src={service.detailImage1} alt={`${service.title} — detail 1`} loading="lazy" decoding="async" />
            </div>
          )}
          {service.detailImage2 && (
            <div className="col-sm-6">
              <img className="img_full" src={service.detailImage2} alt={`${service.title} — detail 2`} loading="lazy" decoding="async" />
            </div>
          )}
        </div>
      )}
      {service.finalDescription && <p>{service.finalDescription}</p>}
      {service.benefits.length > 0 && (
        <ul className="services__details-area-list">
          {service.benefits.map((benefit) => (
            <li key={benefit}>
              <i className="flaticon-check-mark"></i>
              {benefit}
            </li>
          ))}
        </ul>
      )}
      {service.faqs.length > 0 && (
        <>
          <h3>Commonly Asked Questions</h3>
          <div className="mt-30" id="accordionExample">
            {service.faqs.map((faq, index) => (
              <div className="faq-item" key={faq.question}>
                <h5
                  className={`icon${index === 0 ? '' : ' collapsed'}`}
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index + 1}`}
                >
                  {`${index + 1}. ${faq.question}`}
                </h5>
                <div
                  id={`collapse${index + 1}`}
                  className={`faq-item-body collapse${index === 0 ? ' show' : ''}`}
                  data-bs-parent="#accordionExample"
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/** Opens the service named in ?service=<slug> (links from the home page slider). */
export function ServicesExplorerFromUrl({ services }) {
  const slug = useSearchParams().get('service') ?? undefined;
  return <ServicesExplorer services={services} initialSlug={slug} />;
}

/** Sidebar of services + the selected service's details (services page). */
export default function ServicesExplorer({ services, initialSlug }) {
  const initial = services.find((s) => s.slug === initialSlug) || services[0];
  const [activeId, setActiveId] = useState(initial?.id);
  const active = services.find((s) => s.id === activeId) || services[0];

  const select = (event, service) => {
    event.preventDefault();
    setActiveId(service.id);
    window.history.replaceState(null, '', `?service=${service.slug}`);
  };

  return (
    <div className="services__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="all__sidebar">
              <div className="all__sidebar-item">
                <h4>Our Solutions</h4>
                <div className="all__sidebar-item-category">
                  <ul>
                    {services.map((service) => (
                      <li key={service.id}>
                        <a
                          href={`?service=${service.slug}`}
                          className={`service-link${service.id === active?.id ? ' active' : ''}`}
                          onClick={(event) => select(event, service)}
                        >
                          {service.title}
                          <i className="flaticon-right-up"></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="all__sidebar-item-help mb-25" style={{ backgroundImage: "url('/assets/img/page/cta-1.jpg')" }}>
                <h3>Ready for Your Next Construction?</h3>
                <Link className="build_button mt-20" href="/contact">
                  Get an Advice<i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="services__details-area" id="service-content">
              {active ? <ServiceContent key={active.id} service={active} /> : <p>No services available yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
