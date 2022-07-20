import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Alerta } from '../components/ui';
import clienteAxios from '../config/axios';

export function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 5) {
      setAlerta({ msg: 'El email es obligatorio', error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        '/veterinarios/forget-password',
        { email }
      );

      setAlerta({
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Recupera la cuenta para seguir adminitrando tus{' '}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar"
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
          <Link className="block text-center my-3 text-gray-500" to="/">
            ¿No tienes una cuenta Resgistrate?
          </Link>
        </nav>
      </div>
    </>
  );
}
