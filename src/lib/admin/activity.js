import 'server-only';
import { getCurrentAdmin } from '@/lib/auth/session';
import { activityRepo } from '@/lib/repositories';

/**
 * Records an admin change. Never throws: a logging problem (e.g. the migration
 * was not run yet) must not break the save itself.
 * action: 'created' | 'updated' | 'deleted' | 'shown' | 'hidden' | 'signed in' ...
 */
export async function logActivity(action, section, item, admin) {
  try {
    const who = admin ?? (await getCurrentAdmin());
    await activityRepo.addActivity({ adminId: who?.id ?? null, adminName: who?.name || 'Unknown', action, section, item });
  } catch (error) {
    console.error('[activity] could not record:', error.message);
  }
}
