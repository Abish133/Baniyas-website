import Link from 'next/link';

export default function PageHeader({ title, description, actionHref, actionLabel, actionIcon = 'fa-solid fa-plus', backHref, children }) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header__main">
        {backHref && (
          <Link href={backHref} className="admin-page-header__back" aria-label="Back" title="Back">
            <i className="fa-regular fa-arrow-left"></i>
          </Link>
        )}
        <div className="min-w-0">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
      {(actionHref || children) && (
        <div className="admin-page-header__actions">
          {children}
          {actionHref && (
            <Link href={actionHref} className="btn btn-primary">
              <i className={`${actionIcon} me-2`}></i>
              {actionLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
