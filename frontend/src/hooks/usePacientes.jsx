import { useContext } from 'react';
import { pacientesContext } from '../context/PacientesProvider';

const usePacientes = () => {
  return useContext(pacientesContext);
};

export default usePacientes;
