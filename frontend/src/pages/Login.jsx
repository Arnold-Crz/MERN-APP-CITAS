import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import { Alerta } from '../components/ui';
import useAuth from '../hooks/useAuth';
export function Login() {
  const { auth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/veterinarios/login`, {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Inicia Sesion y Administra tus{' '}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl ">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
