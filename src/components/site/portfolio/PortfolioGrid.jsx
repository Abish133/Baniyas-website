// Delay pattern of the original 3-column grid: .4s, .7s, 1s repeating.
const DELAYS = ['.4s', '.7s', '1s'];

export default function PortfolioGrid({ projects }) {
  return (
    <div className="gallery__area four__columns section-padding">
      <div className="container">
        <div className="row gallery__area-active">
          {projects.length === 0 && <p className="t-center">Projects will be published soon.</p>}
          {projects.map((project, index) => (
            <div className="col-xl-4 col-md-6 mt-25 wow fadeInUp" data-wow-delay={DELAYS[index % 3]} key={project.id}>
              <div className="portfolio__four-item">
                {/* width="500" (as in the original markup) makes portrait photos fill the column like landscape ones */}
                <img src={project.image} alt={project.caption} width="500" loading="lazy" decoding="async" />
                <div className="portfolio__four-item-content">
                  <span>{project.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
