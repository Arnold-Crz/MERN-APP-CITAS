import Veterinario from '../models/Veterinario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

import { emailRegistro } from '../helpers/emailRegistro.js';
import { emailForgetPassword } from '../helpers/emailForgetPassword.js';

/**La request siempre se define primero que la response */
const registrar = async (req, res) => {
  const { email, name } = req.body;

  //Revisar usuarios registrados
  const veterinarioExiste = await Veterinario.findOne({
    email,
  });

  if (veterinarioExiste) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    //hacemos una instancia del modelo que creamos de veterinario
    const veterinario = new Veterinario(req.body);

    //Guardar un nuevo veterinario en la base de datos
    const veterinarioGuardado = await veterinario.save();

    //Enviar el email

    emailRegistro({
      email,
      name,
      token: veterinarioGuardado.token,
    });

    //retornamos un json con los datos guardados en la base de datos
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error.response);
  }
};

const perfil = (req, res) => {
  const { veterianrio } = req;
  res.json({ veterianrio: veterianrio });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({
    token,
  });

  if (!usuarioConfirmar) {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.verified = true;
    await usuarioConfirmar.save();

    res.json({ msg: 'Usuario confirmado exitosamente' });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error('Usuario no Existe');
    return res.status(403).json({ msg: error.message });
  }

  // comprobar si el usuario esta confirmado

  if (!usuario.verified) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  //autenticar el usuario

  if (await usuario.comprobarPassword(password)) {
    //generar JWT para el usuario autenticado
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error('Tu password es incorrecto');
    return res.status(403).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  // recuperamos el email que nos manden
  const { email } = req.body;

  //Verificamos que el usuario exista
  const existeVeterinario = await Veterinario.findOne({ email });

  // Si es usuario no existe
  if (!existeVeterinario) {
    const error = new Error('EL Usuario no existe');
    return res.status(400).json({ msg: error.message });
  }
  // Si ese usuario existe en la base de datos lo que vamos hacer es generar un nuevo token
  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();

    //Restablcer password
    emailForgetPassword({
      email,
      name: existeVeterinario.name,
      token: existeVeterinario.token,
    });

    return res.json({ msg: 'Hemos enviado un email a tu correo' });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: 'Token valido el usuario existe' });
  } else {
    const error = new Error('Ese token no es valido');
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;

  const { password } = req.body;

  const usuario = await Veterinario.findOne({ token });
  if (!usuario) {
    const error = new Error('No tienes el token generado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    return res.json({ msg: 'Tu password ha sido restablecido exitosamente' });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  forgetPassword,
  checkToken,
  newPassword,
};
