import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

import { Alerta } from '../components/ui';

export function NewPassword() {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenSucces, setTokenSucces] = useState(false);
  const [passwordmodify, setPasswordModify] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clienteAxios(`/veterinarios/forget-password/${token}`);
        setAlerta({
          msg: 'Ingesa tu nuevo Password',
        });
        setTokenSucces(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace, no es valido',
          error: true,
        });
      }
    };
    verifyToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El Password debe ser minimo de 6 caracteres.',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/veterinarios/forget-password/${token}`,
        { password }
      );
      setAlerta({
        msg: data.msg,
      });
      setPasswordModify(true);
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
          Restablce tu password y no pierdas el control de tus{' '}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenSucces && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 text-xl font-bold"
                htmlFor="password"
              >
                Nuevo Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="*******"
                className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Establecer tu Nuevo Password"
              className="bg-indigo-700 w-full font-bold text-white py-4 rounded-xl uppercase hover:cursor-pointer hover:bg-indigo-800 "
            />

            {passwordmodify && (
              <Link className="block text-center my-5 text-gray-500" to="/">
                inicia Sesion
              </Link>
            )}
          </form>
        )}
      </div>
    </>
  );
}
