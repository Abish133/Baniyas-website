import Header from '@/components/site/layout/Header';
import Footer from '@/components/site/layout/Footer';

export default function InnerPagesLayout({ children }) {
  return (
    <>
      <Header variant="inner" />
      {children}
      <Footer />
    </>
  );
}
