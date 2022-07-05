import Paciente from '../models/Pacientes.js';

const nuevoPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);

  //En la propiedad id de relacion del modelo pacientes, asignamos el id del veterinario con el id de relacion del paciente.veterinario.
  //De esta forma sabemos que veterinario tiene asignado ese paciente
  paciente.veterinario = req.veterinario._id;

  try {
    const pacienteAlmacenado = await paciente.save();
    res.json({ pacienteAlmacenado });
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where('veterinario')
    .equals(req.veterinario);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    const error = new Error('Paciente no encontrado');
    return res.status(404).json({ msg: error.message });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  return res.json({ paciente });
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    const error = new Error('Paciente no encontrado');
    return res.status(404).json({ msg: error.message });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  //Actualizar paciente

  const { nombre, propietario, email, fecha, sintomas } = req.body;
  paciente.nombre = nombre || paciente.nombre;
  paciente.propietario = propietario || paciente.propietario;
  paciente.email = email || paciente.email;
  paciente.fecha = fecha || paciente.fecha;
  paciente.sintomas = sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json({ pacienteActualizado });
  } catch (error) {
    console.log(error);
  }
};
const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    const error = new Error('Paciente no encontrado');
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: 'Paciente eliminado' });
  } catch (error) {
    console.log(error);
  }
};

export {
  nuevoPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
