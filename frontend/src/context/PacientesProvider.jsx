import { createContext } from 'react';

export const pacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const values = {};
  return (
    <pacientesContext.Provider value={values}>
      {children}
    </pacientesContext.Provider>
  );
};

export default PacientesProvider;
