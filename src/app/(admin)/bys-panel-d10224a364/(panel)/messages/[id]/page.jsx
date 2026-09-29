import { messagesRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import { toggleMessageRead, deleteMessage } from '@/actions/admin/messages';
import PageHeader from '@/components/admin/PageHeader';
import RowActions from '@/components/admin/RowActions';
import { initials } from '@/components/admin/nav';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Message' };

export default async function MessagePage({ params }) {
  let message = await loadRecord(params, messagesRepo.findMessage);
  if (!message.isRead) {
    await messagesRepo.markRead(message.id, true);
    message = { ...message, isRead: true };
  }
  const received = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(message.createdAt));
  const replyHref = `mailto:${message.email}?subject=${encodeURIComponent('Re: your enquiry to Bani Yas')}`;

  return (
    <>
      <PageHeader title={`Message from ${message.name}`} description={received} backHref={`${ADMIN_BASE}/messages`}>
        <form action={toggleMessageRead}>
          <input type="hidden" name="id" value={message.id} />
          <button className="btn btn-light" type="submit">
            <i className="fa-regular fa-envelope me-2"></i>Mark as unread
          </button>
        </form>
        <a className="btn btn-primary" href={replyHref}>
          <i className="fa-regular fa-reply me-2"></i>Reply by email
        </a>
      </PageHeader>

      <div className="form-layout">
        <div className="form-layout__main">
          <section className="admin-card admin-message">
            <header className="admin-message__head">
              <span className="admin-avatar admin-avatar--lg">{initials(message.name)}</span>
              <div className="min-w-0">
                <strong>{message.name}</strong>
                <span>{message.email}</span>
              </div>
              <div className="ms-auto">
                <RowActions id={message.id} deleteAction={deleteMessage} itemLabel="this message" />
              </div>
            </header>
            <div className="admin-message__body">{message.message || <em className="text-muted">No message text.</em>}</div>
          </section>
        </div>
        <aside className="form-layout__aside">
          <section className="admin-card form-section">
            <header className="form-section__head">
              <span className="form-section__icon">
                <i className="fa-regular fa-address-card"></i>
              </span>
              <div>
                <h2>Contact details</h2>
              </div>
            </header>
            <dl className="admin-details">
              <div>
                <dt><i className="fa-regular fa-user"></i>Name</dt>
                <dd>{message.name}</dd>
              </div>
              <div>
                <dt><i className="fa-regular fa-at"></i>Email</dt>
                <dd><a href={`mailto:${message.email}`}>{message.email}</a></dd>
              </div>
              <div>
                <dt><i className="fa-regular fa-phone"></i>Phone</dt>
                <dd>{message.phone ? <a href={`tel:${message.phone}`}>{message.phone}</a> : '—'}</dd>
              </div>
              <div>
                <dt><i className="fa-regular fa-clock"></i>Received</dt>
                <dd>{received}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </>
  );
}
