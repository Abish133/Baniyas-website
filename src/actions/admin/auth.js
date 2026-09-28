'use server';

import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminUsersRepo } from '@/lib/repositories';
import { createSession, deleteSession, requireAdmin } from '@/lib/auth/session';
import { clientIp, isLoginLimited, registerFailedLogin, clearFailedLogins } from '@/lib/auth/rate-limit';
import { loginSchema, changePasswordSchema, profileSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { formValues, failure } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';

// Compared against when the email is unknown, so response times don't reveal which emails exist.
let dummyHash;
async function getDummyHash() {
  dummyHash ??= await bcrypt.hash('not-a-real-password', 12);
  return dummyHash;
}

function safeRedirectTarget(value) {
  return typeof value === 'string' && value.startsWith('/bys-panel-d10224a364') && !value.startsWith('//') && value !== '/bys-panel-d10224a364/login'
    ? value
    : '/bys-panel-d10224a364';
}

export async function login(_prevState, formData) {
  const values = formValues(formData, ['email', 'password']);
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) return failure(fieldErrors(parsed.error), { email: values.email });

  const ip = clientIp(await headers());
  const { email } = parsed.data;
  if (isLoginLimited(ip, email)) {
    return failure({}, { email: values.email }, 'Too many failed attempts. Please wait 15 minutes and try again.');
  }

  const user = await adminUsersRepo.findAdminCredentialsByEmail(parsed.data.email);
  const valid = await bcrypt.compare(parsed.data.password, user?.password_hash || (await getDummyHash()));
  if (!user || !valid) {
    registerFailedLogin(ip, email);
    return failure({}, { email: values.email }, 'Invalid email or password.');
  }

  clearFailedLogins(ip, email);
  await adminUsersRepo.touchLastLogin(user.id);
  await createSession(user);
  await logActivity('signed in', 'Account', null, user);
  redirect(safeRedirectTarget(formData.get('next')));
}

export async function logout() {
  await deleteSession();
  redirect('/bys-panel-d10224a364/login');
}

export async function updateProfile(_prevState, formData) {
  const admin = await requireAdmin();
  const values = formValues(formData, ['name', 'email']);
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) return failure(fieldErrors(parsed.error), values);
  if (await adminUsersRepo.emailTaken(parsed.data.email, admin.id)) {
    return failure({ email: 'This email is used by another admin.' }, values);
  }
  await adminUsersRepo.updateProfile(admin.id, parsed.data);
  await logActivity('updated', 'Account', 'Profile', admin);
  return { ok: true, message: 'Profile updated.', values: parsed.data };
}

export async function changePassword(_prevState, formData) {
  const admin = await requireAdmin();
  const values = formValues(formData, ['currentPassword', 'newPassword', 'confirmPassword']);
  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) return failure(fieldErrors(parsed.error), {});

  const credentials = await adminUsersRepo.findAdminCredentialsById(admin.id);
  if (!(await bcrypt.compare(parsed.data.currentPassword, credentials.password_hash))) {
    return failure({ currentPassword: 'Current password is incorrect.' }, {});
  }
  await adminUsersRepo.updatePassword(admin.id, await bcrypt.hash(parsed.data.newPassword, 12));
  await logActivity('updated', 'Account', 'Password', admin);
  return { ok: true, message: 'Password changed successfully.', values: {} };
}
