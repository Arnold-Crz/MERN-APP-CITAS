import useAuth from '../../hooks/useAuth';
import { Alerta, NavAdminPerfil } from '../../components/ui';
import { useEffect, useState } from 'react';

export function UpdatePerfil() {
  const { auth, updatePerfil } = useAuth();

  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleChance = ({ target }) => {
    const { name, value } = target;
    setPerfil({
      ...perfil,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email } = perfil;

    if ([name, email].includes('')) {
      setAlerta({
        msg: 'Los Campos Nombre y Email son Oblogatorios',
        error: true,
      });
    } else {
      setAlerta({});
    }

    updatePerfil(perfil);
  };

  const { msg } = alerta;

  return (
    <>
      <NavAdminPerfil />

      <h2 className="font-bold text-3xl text-center mt-10">Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tu{' '}
        <span className="text-indigo-600 font-bold">Perfil aqui!</span>{' '}
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w1/2 bg-white shadow-md rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="uppercase font-bold text-gray-500"
              >
                Nombre
              </label>
              <input
                id="nombre"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="text"
                placeholder="Ingrese su nombre"
                name="name"
                value={perfil.name || ''}
                onChange={handleChance}
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-500"
              >
                Sitio Web
              </label>
              <input
                id="web"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="text"
                placeholder="Ingrese su Web"
                name="web"
                value={perfil.web || ''}
                onChange={handleChance}
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-500"
              >
                Email
              </label>
              <input
                id="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="text"
                placeholder="Ingrese su email"
                name="email"
                value={perfil.email || ''}
                onChange={handleChance}
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="telefono"
                className="uppercase font-bold text-gray-500"
              >
                Telefono
              </label>
              <input
                id="telefono"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-md"
                type="text"
                placeholder="Ingrese su Telefono"
                name="phone"
                value={perfil.phone || ''}
                onChange={handleChance}
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
