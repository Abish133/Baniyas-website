import { messagesRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import { toggleMessageRead, deleteMessage } from '@/actions/admin/messages';
import PageHeader from '@/components/admin/PageHeader';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Message' };

export default async function MessagePage({ params }) {
  let message = await loadRecord(params, messagesRepo.findMessage);
  if (!message.isRead) {
    await messagesRepo.markRead(message.id, true);
    message = { ...message, isRead: true };
  }
  const received = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(message.createdAt));

  return (
    <>
      <PageHeader title={`Message from ${message.name}`} backHref="/admin/messages" />
      <div className="card admin-card">
        <div className="card-body">
          <dl className="row mb-4">
            <dt className="col-sm-3">Name</dt>
            <dd className="col-sm-9">{message.name}</dd>
            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9"><a href={`mailto:${message.email}`}>{message.email}</a></dd>
            <dt className="col-sm-3">Phone</dt>
            <dd className="col-sm-9">{message.phone ? <a href={`tel:${message.phone}`}>{message.phone}</a> : '—'}</dd>
            <dt className="col-sm-3">Received</dt>
            <dd className="col-sm-9">{received}</dd>
          </dl>
          <div className="admin-message-body">{message.message || <em className="text-muted">No message text.</em>}</div>
          <div className="d-flex gap-2 mt-4">
            <a className="btn btn-primary" href={`mailto:${message.email}?subject=${encodeURIComponent('Re: your enquiry to Bani Yas')}`}>
              <i className="fa-solid fa-reply me-2"></i>Reply by email
            </a>
            <form action={toggleMessageRead}>
              <input type="hidden" name="id" value={message.id} />
              <button className="btn btn-outline-secondary" type="submit">Mark as unread</button>
            </form>
            <div className="ms-auto">
              <RowActions id={message.id} deleteAction={deleteMessage} itemLabel="this message" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
