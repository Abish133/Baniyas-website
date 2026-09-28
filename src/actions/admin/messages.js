'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { messagesRepo } from '@/lib/repositories';
import { parseId } from '@/lib/admin/crud';

export async function toggleMessageRead(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const message = id ? await messagesRepo.findMessage(id) : null;
  if (message) await messagesRepo.markRead(id, !message.isRead);
  revalidatePath('/admin', 'layout');
}

export async function deleteMessage(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  if (id) await messagesRepo.removeMessage(id);
  revalidatePath('/admin', 'layout');
  redirect('/admin/messages?status=deleted');
}
