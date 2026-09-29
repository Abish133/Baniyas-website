'use client';

import { useState } from 'react';
import Link from 'next/link';

/** Hover-to-expand project strip (portfolio__four). */
export default function ProjectShowcase({ projects }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="portfolio__four">
      {projects.length > 0 && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="portfolio__four-area">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`portfolio__four-area-item${activeId === project.id ? ' active' : ''}`}
                    onMouseEnter={() => setActiveId(project.id)}
                  >
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                    <div className="portfolio__four-area-item-area">
                      <div className="portfolio__one-item-content">
                        <span>{project.location}</span>
                        <h4><Link href="/portfolio">{project.title}</Link></h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-60">
        <div className="row al-center">
          <div className="col-xl-5 col-md-7 md-mb-25 lg-t-center title_split_anim">
            <h3>Get Expert Construction Advice and a Free Quote</h3>
          </div>
          <div className="col-xl-7 col-md-5 t-right lg-t-center">
            <div className="item_bounce">
              <Link className="build_button" href="/contact">
                Start a Journey<i className="flaticon-right-up"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
