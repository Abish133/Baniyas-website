import Link from 'next/link';

/** `siteHref` adds a "View on site" button that opens that public page in a new tab. */
export default function PageHeader({ title, description, actionHref, actionLabel, actionIcon = 'fa-solid fa-plus', backHref, siteHref, children }) {
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
      {(actionHref || siteHref || children) && (
        <div className="admin-page-header__actions">
          {children}
          {siteHref && (
            <a href={siteHref} target="_blank" rel="noreferrer" className="btn btn-light">
              <i className="fa-regular fa-arrow-up-right-from-square me-2"></i>View on site
            </a>
          )}
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
