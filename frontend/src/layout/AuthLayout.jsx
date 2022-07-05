import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      <h1>Administrar los Pacientes</h1>
      <Outlet />
    </>
  );
};
