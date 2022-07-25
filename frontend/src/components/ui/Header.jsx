import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="py-10 bg-indigo-600 ">
      <div className="container mx-auto flex justify-between items-center flex-col md:flex-row ">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administracion de {''} <span className="text-white">Pacientes</span>
        </h1>

        <nav className="flex gap-4 items-center flex-col md:flex-row mt-5 md:mt-0">
          <Link
            to="/admin"
            className="text-white text-sm font-bold uppercase  "
          >
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-white text-sm font-bold uppercase "
          >
            Perfil
          </Link>

          <button
            onClick={logout}
            type="button"
            className="text-white text-sm uppercase font-bold p-3 border-white border-2 border-solid"
          >
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};
