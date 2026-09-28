import Link from 'next/link';
import Breadcrumb from '@/components/site/common/Breadcrumb';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <>
      <Breadcrumb title="Page Not Found" current="404" />
      <div className="error section-padding-three">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="error-page">
                <h1>
                  4<span>0</span>4
                </h1>
                <h2>Oops! Page not found.</h2>
                <p>The page you are looking for is not available or doesn’t belong to this website!</p>
                <Link className="build_button" href="/">
                  Back to Home <i className="flaticon-right-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
