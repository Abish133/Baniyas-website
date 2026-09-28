export default function SocialLinks({ className, links }) {
  if (!links.length) return null;
  return (
    <div className={className}>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
              <i className={link.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
