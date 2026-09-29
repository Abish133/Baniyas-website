import { redirect } from 'next/navigation';
import { ADMIN_BASE } from '@/lib/admin-path';

// "Section Headings" moved into the Page content screens.
export default function SettingsPage() {
  redirect(`${ADMIN_BASE}/content/home`);
}
