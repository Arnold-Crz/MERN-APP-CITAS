import { Router } from 'express';
import {
  nuevoPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from '../controllers/pacienteController.js';

import checkAuth from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .post(checkAuth, nuevoPaciente)
  .get(checkAuth, obtenerPacientes);

router
  .route('/:id')
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);
export default router;
