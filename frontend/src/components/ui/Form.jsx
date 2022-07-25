import { useState, useEffect } from 'react';
import usePacientes from '../../hooks/usePacientes';
import { Alerta } from './Alerta';

export const Form = () => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  //para saber si estamos editando
  const [_id, setId] = useState(null);

  //hooks
  const [alerta, setAlerta] = useState({});
  const { savePaciente, paciente } = usePacientes();

  useEffect(() => {
    //verificamos que los campos esten vacios para editarlos con el nuecvo state
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(new Date(paciente.fecha).toISOString());
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const { msg } = alerta;

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true,
      });
      return;
    }

    //pasamos el id al provider para saber si estamos iditando o agregando uno nuevo
    savePaciente({ nombre, propietario, email, fecha, sintomas, _id });
    setAlerta({ msg: 'Guardado Exitosamante' });
    setNombre('');
    setPropietario('');
    setFecha('');
    setEmail('');
    setSintomas('');
    setId('');
  };

  return (
    <>
      <h2 className="font-bold text-3xl text-center">Añade tus pacientes</h2>
      <h3 className="text-center mt-5 mb-10">
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          value={_id ? 'Editar Paciente' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 uppercase font-bold text-white rounded-md hover:bg-indigo-800 cursor-pointer transition-colors "
        />
      </form>
    </>
  );
};
