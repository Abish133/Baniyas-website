const MESSAGES = {
  created: ['success', 'Created successfully. The website is updated.'],
  updated: ['success', 'Changes saved. The website is updated.'],
  deleted: ['success', 'Deleted successfully.'],
  activated: ['success', 'Item is now visible on the website.'],
  deactivated: ['secondary', 'Item is now hidden from the website.'],
  limit: ['warning', 'The maximum number of active items for this section is reached. Deactivate another item first.'],
  incomplete: ['warning', 'This service needs a main image and details before it can be shown on the services page. Edit it first.'],
};

export default function StatusAlert({ status }) {
  const entry = MESSAGES[status];
  if (!entry) return null;
  const [tone, text] = entry;
  return (
    <div className={`alert alert-${tone}`} role="status">
      {text}
    </div>
  );
}
