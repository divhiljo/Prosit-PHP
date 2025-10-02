import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ background: '#f7f7f8', minHeight: 'calc(100vh - 422px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
