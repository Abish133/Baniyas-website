/** "Our Clients" grid on the About page (data from the CMS). */
export default function ClientsGrid({ subtitle, title, clients }) {
  if (!clients.length) return null;
  return (
    <div className="clients__area section-padding">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">{subtitle}</span>
              {/* SplitText rewrites this markup, so a changed heading must replace the element. */}
              <h2 className="title_split_anim" key={title}>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {clients.map((client, index) => (
            // Same staggered delays as the original: .2s, .3s, .4s …
            <div className="col-lg-3 col-md-6 mb-30 wow fadeInUp" data-wow-delay={`${(0.2 + index * 0.1).toFixed(1)}s`} key={client.id}>
              <div className="client__item">
                <h6>{client.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
