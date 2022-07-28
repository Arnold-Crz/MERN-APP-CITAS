import express from 'express';
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  forgetPassword,
  checkToken,
  newPassword,
  updatePerfil,
  changePassword,
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//rutas publicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/forget-password', forgetPassword);

//router.get('/forget-password/:token', checkToken);
//router.port('/forget-password/:token', newPassword);

router.route('/forget-password/:token').get(checkToken).post(newPassword);

//rutas privadas

// La funcion checkAuth es un middelware que nos ayuda a saber si un usuario esta auntenticado.
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, updatePerfil);
router.put('/cambiar-password', checkAuth, changePassword);
export default router;
