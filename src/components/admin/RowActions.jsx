'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import ConfirmDialog from './ConfirmDialog';

function PendingIcon({ icon }) {
  const { pending } = useFormStatus();
  return pending ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : <i className={icon}></i>;
}

/** Edit / show-hide / delete buttons for a table row. */
export default function RowActions({ id, editHref, editIcon = 'fa-regular fa-pen', editLabel = 'Edit', toggleAction, deleteAction, isActive, itemLabel = 'this item' }) {
  const deleteForm = useRef(null);
  const confirmed = useRef(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="admin-row-actions">
      {editHref && (
        <Link href={editHref} className="admin-action" title={editLabel} aria-label={editLabel}>
          <i className={editIcon}></i>
        </Link>
      )}
      {toggleAction && (
        <form action={toggleAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="admin-action"
            title={isActive ? 'Hide from website' : 'Show on website'}
            aria-label={isActive ? 'Hide from website' : 'Show on website'}
          >
            <PendingIcon icon={`fa-regular ${isActive ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        </form>
      )}
      {deleteAction && (
        <form
          ref={deleteForm}
          action={deleteAction}
          onSubmit={(event) => {
            if (confirmed.current) {
              confirmed.current = false;
              return;
            }
            event.preventDefault();
            setConfirming(true);
          }}
        >
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="admin-action admin-action--danger" title="Delete" aria-label="Delete">
            <PendingIcon icon="fa-regular fa-trash-can" />
          </button>
        </form>
      )}
      {confirming && (
        <ConfirmDialog
          title="Delete permanently?"
          message={`${itemLabel.charAt(0).toUpperCase()}${itemLabel.slice(1)} will be deleted. This cannot be undone.`}
          confirmLabel="Delete"
          onCancel={() => setConfirming(false)}
          onConfirm={() => {
            setConfirming(false);
            confirmed.current = true;
            deleteForm.current?.requestSubmit();
          }}
        />
      )}
    </div>
  );
}
