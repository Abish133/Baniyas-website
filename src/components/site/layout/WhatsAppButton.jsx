/** Floating "chat on WhatsApp" button (only when a number is set in Contact Details). */
export default function WhatsAppButton({ whatsapp }) {
  if (!whatsapp) return null;
  return (
    <a className="whatsapp-float" href={whatsapp.href} target="_blank" rel="noreferrer" aria-label={`Chat on WhatsApp (${whatsapp.label})`} title="Chat on WhatsApp">
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
