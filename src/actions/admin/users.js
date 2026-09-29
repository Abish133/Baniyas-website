'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { adminUsersRepo } from '@/lib/repositories';
import { adminUserSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { formValues, parseId, failure } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';
import { ADMIN_BASE } from '@/lib/admin-path';

const LIST_PATH = `${ADMIN_BASE}/users`;

export async function saveAdminUser(_prevState, formData) {
  const admin = await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await adminUsersRepo.findAdminById(id) : null;
  if (id && !existing) return failure({}, {}, 'This admin no longer exists.');

  const values = formValues(formData, ['name', 'email', 'password']);
  const parsed = adminUserSchema({ creating: !existing }).safeParse(values);
  if (!parsed.success) return failure(fieldErrors(parsed.error), { ...values, password: '' });
  const { name, email, password } = parsed.data;

  if (await adminUsersRepo.emailTaken(email, id || 0)) {
    return failure({ email: 'This email is already used by another admin.' }, { ...values, password: '' });
  }

  if (existing) {
    await adminUsersRepo.updateProfile(id, { name, email });
    if (password) await adminUsersRepo.updatePassword(id, await bcrypt.hash(password, 12));
  } else {
    await adminUsersRepo.createAdmin({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  }
  await logActivity(existing ? 'updated' : 'created', 'Admin Users', `${name} (${email})${existing && password ? ' — password reset' : ''}`, admin);
  redirect(`${LIST_PATH}?status=${existing ? 'updated' : 'created'}`);
}

export async function deleteAdminUser(formData) {
  const admin = await requireAdmin();
  const id = parseId(formData.get('id'));
  const target = id ? await adminUsersRepo.findAdminById(id) : null;
  if (!target) redirect(LIST_PATH);
  // Never lock everyone out: you cannot delete yourself or the last admin.
  if (target.id === admin.id) redirect(`${LIST_PATH}?status=selfdelete`);
  if ((await adminUsersRepo.countAdmins()) <= 1) redirect(`${LIST_PATH}?status=lastadmin`);

  await adminUsersRepo.removeAdmin(id);
  await logActivity('deleted', 'Admin Users', `${target.name} (${target.email})`, admin);
  redirect(`${LIST_PATH}?status=deleted`);
}
