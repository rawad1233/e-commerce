import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useDirection } from '@/hooks/useDirection';

const Layout = () => {
  useDirection();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;