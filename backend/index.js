// Express Frameworks
import express from 'express';

//paquete para configurar las variables de entorno
import dotenv from 'dotenv';

//Conexion con la base de datos
import { conectDB } from './config/db.js';

//rutas
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

//inializacion de express
const app = express();

/** se requiere esta depencia para leer las variables de entorno */
dotenv.config();

//conectar con la base de datos
conectDB();

/** permite entender JSON */
app.use(express.json());

//rutas de la API
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

/** Levantando el servidor */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
