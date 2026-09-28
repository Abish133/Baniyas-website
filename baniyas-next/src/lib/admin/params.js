import 'server-only';
import { notFound } from 'next/navigation';

/** Resolves the `[id]` route param and loads the record, or renders 404. */
export async function loadRecord(params, finder) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();
  const record = await finder(numericId);
  if (!record) notFound();
  return record;
}
