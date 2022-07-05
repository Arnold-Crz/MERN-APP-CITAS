import jwt from 'jsonwebtoken';

import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
  let token;

  //Comprovamos que el token exista
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Tomando el token de las cabeceras que enviamos en postman
      token = req.headers.authorization.replace('Bearer ', '');

      //Llamamos a la metodo de jwt para verificar el token, toma el token y la palabra secreta que tenenmos en process.env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Llamamos el modelo de la base de datos y le pasamos el decoded.id para verificar el usuario que esta haciendo sesion y eliminamos los campos que no requerimos el password y verified
      req.veterinario = await Veterinario.findById(decoded.id).select(
        '-password -verified'
      );
      return next();
    } catch (error) {
      const errormesage = new Error('Token no valido');
      res.status(403).json({ msg: errormesage.message });
    }
  }
  if (!token) {
    const errormesages = new Error('Token no existe');
    res.status(403).json({ msg: errormesages.message });
  }

  next();
};
export default checkAuth;
