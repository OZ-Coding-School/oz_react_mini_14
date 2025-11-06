import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
