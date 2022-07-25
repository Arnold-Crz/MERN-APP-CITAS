import usePacientes from '../../hooks/usePacientes';
import { formatDate } from '../../helpers';

export const Paciente = ({ paciente }) => {
  const { editPaciente } = usePacientes();
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-gray-500 my-3">
        Nombre:{' '}
        <span className="font-normal normal-case text-black">{nombre}</span>{' '}
      </p>
      <p className="font-bold uppercase text-gray-500 my-3">
        Nombre del Propietario:{' '}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>{' '}
      </p>
      <p className="font-bold uppercase text-gray-500 my-3">
        Email:{' '}
        <span className="font-normal normal-case text-black">{email}</span>{' '}
      </p>
      <p className="font-bold uppercase text-gray-500 my-3">
        Fecha de Alta:{' '}
        <span className="font-normal normal-case text-black">
          {formatDate(fecha)}
        </span>{' '}
      </p>
      <p className="font-bold uppercase text-gray-500 my-3">
        Sintomas de la mascota:{' '}
        <span className="font-normal normal-case text-black">{sintomas}</span>{' '}
      </p>

      <div className="flex justify-between my-5">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase rounded-md"
          onClick={() => editPaciente(paciente)}
        >
          Editar
        </button>
        <button className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase rounded-md">
          Eliminar
        </button>
      </div>
    </div>
  );
};
