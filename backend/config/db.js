import mongoose from 'mongoose';

export const conectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATA_BASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error:${error.message}`);
    process.exit(1);
  }
};

/* 
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/

/* const moongoConnections = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (moongoConnections.isConnected) {
    return console.log('Base de Datos Conectada');
  }

  //Si ya exste una coneccion en la base de datos
  if (mongoose.connections.length > 0) {
    moongoConnections.isConnected = mongoose.connections[0].readyState;

    if (moongoConnections.isConnected === 1) {
      console.log('Usando conexion Anterior ');
      return;
    }

    disconnectDB();
  }

  try {
    await mongoose.connect(process.env.DATA_BASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    moongoConnections.isConnected = 1;
    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error:${error.message}`);
  }
};

const disconnectDB = async () => {
  if (moongoConnections.isConnected === 0) {
    await mongoose.disconnect();
    const error = new Error('Base de datos desconectada');
    console.log(error);
    return;
  }
}; */
