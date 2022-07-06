import { Link } from 'react-router-dom';
import { useState } from 'react';
export function Register() {
  const INITIAL_FORM = {
    nombre: '',
    email: '',
    password: '',
    repitePassword: '',
  };

  const [form, setForm] = useState(INITIAL_FORM);
  const { nombre, email, password, repitePassword } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Crea tu cuenta y administra tus{' '}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        <form>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-xl font-bold"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              name="nombre"
              type="text"
              id="nombre"
              placeholder="Escribe tu Nombre"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="correo@correo.com"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
              value={email}
              onChange={handleChange}
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
              name="password"
              type="password"
              id="password"
              placeholder="*******"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-xl font-bold"
              htmlFor="repite-password"
            >
              Repite tu password
            </label>
            <input
              name="repitePassword"
              type="password"
              id="repitePassword"
              placeholder="*******"
              className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
              value={repitePassword}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full font-bold text-white py-4 rounded-xl uppercase hover:cursor-pointer hover:bg-indigo-800 "
          />
        </form>

        <nav
          className="mt-10 md:flex md:justify-between 
        "
        >
          <Link className="block text-center my-3 text-gray-500" to="/">
            ¿Ya tienes una cuenta inicia sesion?
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
