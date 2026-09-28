import { notFound } from 'next/navigation';

// Catch-all so unknown URLs render the themed 404 page (with header + footer).
export default function CatchAll() {
  notFound();
}
