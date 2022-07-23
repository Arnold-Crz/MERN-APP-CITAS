import { useState } from 'react';
import { Alerta } from './Alerta';

export const Form = () => {
  const [name, setName] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState(Date.now());
  const [sintomas, setSintomas] = useState('');

  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([name, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true,
      });
      return;
    }
  };

  return (
    <>
      <h3 className="text-center mb-10">
        Admisnitra tus{' '}
        <span className="text-indigo-600 font-bold">Pacientes</span>{' '}
      </h3>

      {msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 mb-10 rounded-md shadow-md lg:mb-0"
      >
        <div>
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="paciente"
          >
            Nombre del Paciente
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del Paciente"
            name="paciente"
            id="paciente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            className="text-gray-700 uppercase font-bold "
            htmlFor="propietario"
          >
            Nombre del Propietario
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del Propietario"
            name="propietario"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="email">
            email
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email del Paciente"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">
            Fecha de Alta
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            name="fecha"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="sintomas"
            id="sintomas"
            placeholder="Describe los sintomas de tu paciente"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Agregar Paciente"
          className="bg-indigo-600 w-full p-3 uppercase font-bold text-white rounded-md hover:bg-indigo-800 cursor-pointer transition-colors "
        />
      </form>
    </>
  );
};
