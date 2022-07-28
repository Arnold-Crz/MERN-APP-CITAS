import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Alerta, NavAdminPerfil } from '../../components/ui';

export function UpdatePassword() {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    password_actual: '',
    password_nuevo: '',
  });

  const { saveNewPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(password).some((campos) => campos === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
    } else {
      setAlerta({});
    }

    if (password.password_nuevo.length < 6) {
      setAlerta({
        msg: 'El Password de ser mayor a 6 caracteres',
        error: true,
      });
      return;
    }

    const changePassword = await saveNewPassword(password);

    setAlerta(changePassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };
  const { msg } = alerta;
  return (
    <>
      <NavAdminPerfil />
      <h2 className="font-bold text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{' '}
        <span className="text-indigo-600 font-bold">Password aqui!</span>{' '}
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w1/2 bg-white shadow-md rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="password_actual"
                className="uppercase font-bold text-gray-500"
              >
                Password Actual
              </label>
              <input
                id="password_actual"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="password"
                placeholder="Ingrese su password"
                name="password_actual"
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="password_nuevo"
                className="uppercase font-bold text-gray-500"
              >
                Nuevo Password
              </label>
              <input
                id="password_nuevo"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="password"
                placeholder="Ingrese su nuevo password"
                name="password_nuevo"
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-600 hover:bg-indigo-700 px-10 py-3 mt-8 rounded-lg w-full text-white uppercase font-bold text-xl"
            />
          </form>
        </div>
      </div>
    </>
  );
}
