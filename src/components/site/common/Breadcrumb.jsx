import Link from 'next/link';

export default function Breadcrumb({ title, current = title }) {
  return (
    <div className="breadcrumb__area" style={{ backgroundImage: "url('/assets/img/page/breadcrumb.jpg')" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb__area-content">
              <h2>{title}</h2>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                  <i className="fa-regular fa-angle-right"></i>
                </li>
                <li>{current}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
