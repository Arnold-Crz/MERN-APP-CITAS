import usePacientes from '../../hooks/usePacientes';
import { Paciente } from './Paciente';

export const ListPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-3xl">
            Listado de Pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{' '}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>{' '}
          </p>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="text-center font-bold text-3xl">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregar pacientes{' '}
            <span className="text-indigo-600 font-bold">
              y se listaran en esta seccion
            </span>{' '}
          </p>
        </>
      )}
    </>
  );
};
