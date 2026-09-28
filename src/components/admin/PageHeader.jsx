import Link from 'next/link';

export default function PageHeader({ title, description, actionHref, actionLabel, backHref }) {
  return (
    <div className="admin-page-header">
      <div>
        {backHref && (
          <Link href={backHref} className="admin-back-link">
            <i className="fa-solid fa-arrow-left me-1"></i>Back
          </Link>
        )}
        <h1>{title}</h1>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} className="btn btn-primary">
          <i className="fa-solid fa-plus me-2"></i>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
