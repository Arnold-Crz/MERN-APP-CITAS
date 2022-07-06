import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-3 gap-20 p-4 items-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
};
