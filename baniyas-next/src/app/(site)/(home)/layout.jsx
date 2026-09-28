import Header from '@/components/site/layout/Header';
import HomeFooter from '@/components/site/layout/HomeFooter';

export default function HomeLayout({ children }) {
  return (
    <>
      <Header variant="home" />
      {children}
      <HomeFooter />
    </>
  );
}
