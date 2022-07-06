// Express Frameworks
import express from 'express';

// importando el paquete de cors
import cors from 'cors';

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

// configuraciones de cors para permiter que algunas url hagan cierta comunicacion con el backend desde el frontend
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No Permitido por CORS'));
    }
  },
};

// que nuestro backen entienda los cors y le pasamos las opciones
app.use(cors(corsOptions));

//rutas de la API
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

/** Levantando el servidor */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
