'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { messagesRepo } from '@/lib/repositories';
import { parseId } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';
import { ADMIN_BASE } from '@/lib/admin-path';

export async function toggleMessageRead(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const message = id ? await messagesRepo.findMessage(id) : null;
  if (message) await messagesRepo.markRead(id, !message.isRead);
  revalidatePath(ADMIN_BASE, 'layout');
}

export async function markAllMessagesRead() {
  await requireAdmin();
  await messagesRepo.markAllRead();
  revalidatePath(ADMIN_BASE, 'layout');
  redirect(`${ADMIN_BASE}/messages?status=allread`);
}

export async function deleteMessage(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const message = id ? await messagesRepo.findMessage(id) : null;
  if (message) {
    await messagesRepo.removeMessage(id);
    await logActivity('deleted', 'Messages', `Message from ${message.name}`);
  }
  revalidatePath(ADMIN_BASE, 'layout');
  redirect(`${ADMIN_BASE}/messages?status=deleted`);
}
