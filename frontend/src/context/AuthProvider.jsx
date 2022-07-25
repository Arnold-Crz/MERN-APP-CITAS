import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLogin(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios('/veterinarios/perfil', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLogin(false);
    };

    authUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const updatePerfil = async (datos) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLogin(false);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const value = {
    auth,
    setAuth,
    login,
    logout,
    updatePerfil,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
