import Link from 'next/link';

/** Logo + "BANIYAS Builders" word mark, exactly as in the original markup. */
export default function BrandLogo({ color = '#ffffff', className = 'header__area-menubar-left-logo' }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      <Link href="/" style={{ marginRight: '-20px' }}>
        <img src="/assets/img/logo.png" style={{ height: '106px' }} alt="logo" />
      </Link>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: 1.2, color }}>BANIYAS</div>
        <div style={{ fontWeight: 'bold', fontSize: '20px', lineHeight: 1.2, color }}>Builders</div>
      </div>
    </div>
  );
}
