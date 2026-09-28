import Link from 'next/link';

/**
 * Responsive data table inside a card, with a count summary and an empty state.
 * columns: [{ key, label, className, render(row) }]
 */
export default function AdminTable({ columns, rows, emptyText = 'Nothing here yet.', emptyIcon = 'fa-regular fa-inbox', emptyAction, itemLabel = 'items' }) {
  const hasStatus = rows.some((row) => typeof row.isActive === 'boolean');
  const visible = rows.filter((row) => row.isActive).length;

  return (
    <div className="admin-card admin-table-card">
      {rows.length > 0 && (
        <div className="admin-table-card__toolbar">
          <span className="admin-chip">
            <strong>{rows.length}</strong> {itemLabel}
          </span>
          {hasStatus && (
            <>
              <span className="admin-chip admin-chip--success">
                <span className="admin-dot"></span>
                {visible} visible
              </span>
              {rows.length - visible > 0 && (
                <span className="admin-chip">
                  <span className="admin-dot admin-dot--muted"></span>
                  {rows.length - visible} hidden
                </span>
              )}
            </>
          )}
        </div>
      )}
      {rows.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty__icon">
            <i className={emptyIcon}></i>
          </span>
          <p>{emptyText}</p>
          {emptyAction && (
            <Link href={emptyAction.href} className="btn btn-primary btn-sm">
              <i className="fa-solid fa-plus me-2"></i>
              {emptyAction.label}
            </Link>
          )}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table admin-table align-middle mb-0">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={col.className}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={row.isActive === false ? 'is-inactive' : undefined}>
                  {columns.map((col) => (
                    <td key={col.key} className={col.className}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function ActiveBadge({ active }) {
  return active ? (
    <span className="admin-status admin-status--on">
      <span className="admin-dot"></span>Visible
    </span>
  ) : (
    <span className="admin-status">
      <span className="admin-dot admin-dot--muted"></span>Hidden
    </span>
  );
}

export function Thumb({ src, alt = '', wide = false }) {
  return <img src={src} alt={alt} className={`admin-thumb${wide ? ' admin-thumb--wide' : ''}`} loading="lazy" />;
}

/** Title + secondary line used in the first column of most tables. */
export function CellTitle({ title, subtitle, href }) {
  return (
    <div className="admin-cell-title">
      {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
      {subtitle && <small>{subtitle}</small>}
    </div>
  );
}
