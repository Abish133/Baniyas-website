'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';

function PendingIcon({ icon }) {
  const { pending } = useFormStatus();
  return pending ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : <i className={icon}></i>;
}

/** Edit / show-hide / delete buttons for a table row. */
export default function RowActions({ id, editHref, toggleAction, deleteAction, isActive, itemLabel = 'this item' }) {
  return (
    <div className="d-flex gap-1 justify-content-end">
      {editHref && (
        <Link href={editHref} className="btn btn-sm btn-outline-primary" title="Edit">
          <i className="fa-solid fa-pen"></i>
        </Link>
      )}
      {toggleAction && (
        <form action={toggleAction}>
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="btn btn-sm btn-outline-secondary" title={isActive ? 'Hide from website' : 'Show on website'}>
            <PendingIcon icon={`fa-solid ${isActive ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        </form>
      )}
      {deleteAction && (
        <form
          action={deleteAction}
          onSubmit={(event) => {
            if (!window.confirm(`Delete ${itemLabel}? This cannot be undone.`)) event.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="btn btn-sm btn-outline-danger" title="Delete">
            <PendingIcon icon="fa-solid fa-trash" />
          </button>
        </form>
      )}
    </div>
  );
}
