/**
 * Simple responsive table.
 * columns: [{ key, label, className, render(row) }]
 */
export default function AdminTable({ columns, rows, emptyText = 'Nothing here yet.' }) {
  return (
    <div className="card admin-card">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 admin-table">
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-5">
                  {emptyText}
                </td>
              </tr>
            )}
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
    </div>
  );
}

export function ActiveBadge({ active }) {
  return active ? <span className="badge text-bg-success">Visible</span> : <span className="badge text-bg-secondary">Hidden</span>;
}

export function Thumb({ src, alt = '', wide = false }) {
  return <img src={src} alt={alt} className={`admin-thumb${wide ? ' admin-thumb--wide' : ''}`} />;
}
