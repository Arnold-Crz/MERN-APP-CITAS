import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

export const pacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState([]);

  useEffect(() => {
    const getPacientes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios('/pacientes', config);
        setPacientes(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    getPacientes();
  }, []);

  // Guardar y editar un Paciente
  const savePaciente = async (paciente) => {
    //autorizamos al usuario para crear un nuevo paciente
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente._id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente._id}`,
          paciente,
          config
        );

        //Actualizar el paciente en el state
        const pacienteUpdate = pacientes.map((pacienteState) =>
          pacienteState._id === data.pacienteActualizado._id
            ? data.pacienteActualizado
            : pacienteState
        );
        setPacientes(pacienteUpdate);
        //
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          '/pacientes',
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...nuevoPacienteAlmacenado } =
          data.pacienteAlmacenado;

        setPacientes([nuevoPacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const editPaciente = (paciente) => {
    setPaciente(paciente);
  };

  const deletePaciente = async (id) => {
    const confirmar = confirm('Desea eleminar el Paciente?');
    if (confirmar) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        await clienteAxios.delete(`/pacientes/${id}`, config);

        const updatePacientes = pacientes.filter(
          (pacienteSate) => pacienteSate._id !== id
        );
        setPacientes(updatePacientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const DATA = {
    pacientes,
    savePaciente,
    editPaciente,
    paciente,
    deletePaciente,
  };

  return (
    <pacientesContext.Provider value={DATA}>
      {children}
    </pacientesContext.Provider>
  );
};

export default PacientesProvider;
