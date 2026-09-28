'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

// Loop mode needs at least slidesPerView * 2 slides; repeat short lists.
const MIN_LOOP_SLIDES = 6;

function padForLoop(items) {
  if (!items.length) return items;
  const out = [...items];
  while (out.length < MIN_LOOP_SLIDES) out.push(...items);
  return out;
}

/** Home "services_four_slide" carousel — same options as the original theme. */
export default function ServicesSlider({ services }) {
  const ref = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(ref.current, {
      modules: [Autoplay],
      spaceBetween: 25,
      slidesPerView: 3,
      speed: 1000,
      loop: true,
      autoplay: { delay: 4000, reverseDirection: false, disableOnInteraction: false },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1025: { slidesPerView: 3 },
      },
    });
    return () => swiper.destroy(true, true);
  }, [services]);

  return (
    <div className="swiper services_four_slide data_cursor" data-cursor-text="Drag" ref={ref}>
      <div className="swiper-wrapper">
        {padForLoop(services).map((service, index) => (
          <div className="swiper-slide" key={`${service.id}-${index}`}>
            <div className="services__one-item">
              <i className={service.icon}></i>
              <h4>
                <Link href={service.showOnPage ? `/services?service=${service.slug}` : '/services'}>{service.cardTitle}</Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
