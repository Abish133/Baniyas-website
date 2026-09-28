export default function OrgChart() {
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-xl-12">
          <div className="section-title t-center">
            <h2 className="wow fadeInLeft" data-wow-delay=".4s">Organizational chart</h2>
          </div>
        </div>
      </div>
      <section className="custom-section py-5">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 lg-mb-25">
              <div className="success__area-title mr-70 xl-mr-0">
                <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Construction Advices</span>
                <h2 className="title_split_anim mb-20">&quot;Built Around Human Potential.&quot;</h2>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  At Baniyas Builders, our greatest asset is our team. With a solid foundation built on experience,
                  integrity, and a shared commitment to excellence, our people are the driving force behind every
                  successful project we deliver.
                </p>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  From visionary architects and meticulous engineers to seasoned project managers and skilled tradespeople,
                  each member of the Baniyas Builders team brings a deep understanding of the construction industry and a
                  passion for building the right way — safely, efficiently, and to the highest standards. We believe in
                  collaboration at every level. Our hands-on leadership style ensures clear communication, timely
                  decision-making, and seamless coordination across every phase of the construction process. Whether
                  we&apos;re delivering a luxury villa, a commercial development, or an infrastructure project, our team
                  works with one goal in mind: to exceed expectations and build lasting trust. When you choose Baniyas
                  Builders, you&apos;re not just hiring a contractor — you&apos;re partnering with a team that’s committed
                  to your vision, focused on quality, and dedicated to delivering results that stand the test of time.
                </p>
              </div>
            </div>
            <div className="col-md-6 image-column text-center">
              <img src="/assets/img/bani_org_chart (2).png" alt="Sample Image" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
