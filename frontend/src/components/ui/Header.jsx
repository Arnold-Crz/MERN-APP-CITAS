import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="py-10 bg-indigo-600 ">
      <div className="container mx-auto flex justify-between items-center ">
        <h1 className="font-bold text-2xl text-indigo-200">
          Administracion de {''} <span className="text-white">Pacientes</span>
        </h1>

        <nav className="flex gap-4 items-center">
          <Link
            to="/pacientes"
            className="text-white text-sm font-bold uppercase "
          >
            Pacientes
          </Link>
          <Link
            to="/perfil"
            className="text-white text-sm font-bold uppercase "
          >
            Perfil
          </Link>

          <button
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
