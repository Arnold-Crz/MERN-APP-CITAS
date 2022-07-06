import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Alerta } from '../components/ui';
import clienteAxios from '../config/axios';

export function Confirm() {
  const [cuentaConfirm, setcuentaConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmAcount = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setcuentaConfirm(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }

      setLoading(false);
    };
    confirmAcount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Confirma tu cuenta y comienza adminitrar tus{' '}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {!loading && <Alerta alerta={alerta} />}

        {cuentaConfirm && (
          <Link className="block text-center my-3 text-gray-500" to="/">
            Tu cuenta ya esta confirmada inicia Sesion
          </Link>
        )}
      </div>
    </>
  );
}
