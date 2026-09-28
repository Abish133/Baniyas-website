import { SOCIAL_LINKS } from '@/lib/constants/site';

export default function SocialLinks({ className }) {
  return (
    <div className={className}>
      <ul>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              <i className={link.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
