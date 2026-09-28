'use client';

import { useEffect, useRef } from 'react';

/** Modal confirmation built on <dialog> (focus trap, Esc and backdrop handling come from the browser). */
export default function ConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.open && dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="admin-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => event.target === ref.current && onCancel()}
    >
      <div className="admin-dialog__body">
        <span className="admin-dialog__icon">
          <i className="fa-regular fa-trash-can"></i>
        </span>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
      <div className="admin-dialog__actions">
        <button type="button" className="btn btn-light" onClick={onCancel} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
