import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const veterinarioSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

//pre es un midellware de ORM de Mongoose que permite tomar ciertas accions antes de seguir con la siguiente instrucion
veterinarioSchema.pre('save', async function (next) {
  //verificamos si el passwor del user ya ha sido modificado, si ya fue hasheado sigue con la sguiente operacion que es guardarlo
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;
