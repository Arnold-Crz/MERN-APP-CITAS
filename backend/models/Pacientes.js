import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    propietario: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fecha: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      require: true,
    },
    //Relacion con el veterinario, de esta forma se hacen las relaciones en mongo
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinario', // Este es el modelo con el que relacionas esto depende del nombre que le colocastes a tu Schema
    },
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;
