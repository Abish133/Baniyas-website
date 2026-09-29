import { getCurrentAdmin } from '@/lib/auth/session';
import { messagesRepo } from '@/lib/repositories';
import { toCsv } from '@/lib/admin/csv';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(date));

/** Downloads the (optionally filtered) messages as a CSV file for Excel. */
export async function GET(request) {
  if (!(await getCurrentAdmin())) return new Response('Unauthorized', { status: 401 });

  const params = request.nextUrl.searchParams;
  const messages = await messagesRepo.listMessages({ search: params.get('q')?.trim() || undefined, unreadOnly: params.get('filter') === 'unread' });
  const rows = [
    ['Received (Dubai time)', 'Name', 'Email', 'Phone', 'Message', 'Read'],
    ...messages.map((m) => [formatDate(m.createdAt), m.name, m.email, m.phone, m.message, m.isRead ? 'Yes' : 'No']),
  ];
  const csv = toCsv(rows);
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="messages-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
