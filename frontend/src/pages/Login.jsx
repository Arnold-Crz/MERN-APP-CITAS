import { Link } from 'react-router-dom';
export function Login() {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Inicia Sesion y Administra tus{' '}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl ">
        <form>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="correo@correo.com"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="*****"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full font-bold text-white py-4 rounded-xl uppercase hover:cursor-pointer hover:bg-indigo-800 "
          />
        </form>

        <nav
          className="mt-10 md:flex md:justify-between 
        "
        >
          <Link
            className="block text-center my-3 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta Resgistrate?
          </Link>
          <Link
            className="block text-center my-3 text-gray-500"
            to="/olvide-password"
          >
            olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
}
