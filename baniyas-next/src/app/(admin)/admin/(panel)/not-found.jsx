import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5">404</h1>
      <p className="text-muted">This record or page does not exist.</p>
      <Link href="/admin" className="btn btn-primary">Back to dashboard</Link>
    </div>
  );
}
