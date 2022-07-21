import { Outlet, Navigate } from 'react-router-dom';
import { Header, Footer } from '../components/ui';
import useAuth from '../hooks/useAuth';

export const AdminLayout = () => {
  const { auth, login } = useAuth();

  if (login) return 'cargando...';
  return (
    <>
      <Header />

      {auth?.veterinario?._id ? <Outlet /> : <Navigate to="/" />}

      <Footer />
    </>
  );
};
