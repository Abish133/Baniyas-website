import Link from 'next/link';

function ApplyLink({ href }) {
  const target = href || '/contact';
  const content = (
    <>
      Apply Now<i className="flaticon-right-up"></i>
    </>
  );
  return target.startsWith('/') ? (
    <Link className="build_button mt-20" href={target}>{content}</Link>
  ) : (
    <a className="build_button mt-20" href={target} target={target.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  );
}

export default function JobOpenings({ jobs }) {
  return (
    <div className="job__openings section-padding pt-0">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="section-title t-center">
              <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Current Opportunities</span>
              <h2 className="title_split_anim">Open Positions</h2>
            </div>
          </div>
        </div>
        <div className="row" id="jobsContainer">
          {jobs.length === 0 && <div className="error">No job openings available at the moment.</div>}
          {jobs.map((job, index) => {
            const requirements = (job.requirements || '').split('\n').map((r) => r.trim()).filter(Boolean);
            return (
              <div className="col-lg-6 mb-30 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.2 + 0.4}s`} key={job.id}>
                <div className="job__card">
                  <div className="job__card-header">
                    <h4>{job.title}</h4>
                    <span className="job__type">{job.jobType || 'Full-time'}</span>
                  </div>
                  <div className="job__card-content">
                    <p><i className="flaticon-location-1"></i>{` ${job.location}`}</p>
                    <p><i className="flaticon-calendar"></i>{` ${job.experience}`}</p>
                    {requirements.length > 0 && (
                      <ul className="job__requirements">
                        {requirements.map((req) => <li key={req}>{req}</li>)}
                      </ul>
                    )}
                    <div className="item_bounce">
                      <ApplyLink href={job.applyLink} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
