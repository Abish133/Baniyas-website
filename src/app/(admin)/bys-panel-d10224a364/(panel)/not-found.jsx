import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="admin-card admin-empty admin-empty--page">
      <span className="admin-empty__icon">
        <i className="fa-regular fa-compass"></i>
      </span>
      <h1>Page not found</h1>
      <p>This record or page does not exist. It may have been deleted.</p>
      <Link href="/bys-panel-d10224a364" className="btn btn-primary">
        <i className="fa-regular fa-arrow-left me-2"></i>Back to dashboard
      </Link>
    </div>
  );
}
