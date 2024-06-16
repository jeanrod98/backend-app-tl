import mongoose from "mongoose";

const avanceSchema = mongoose.Schema(
  {
    terapeuta_av: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
    },
    paciente_av: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clientes",
    },
    nombreModulo_av: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    fecha_av: {
      type: String,
      require: true,
    },

    userCreatedAt: {
      type: String,
      trim: true,
      default: null,
    },
    userUpdatedAt: {
      type: String,
      trim: true,
      default: null,
      //   new Date().toLocaleString("EC")
    },
  },
  {
    timestamps: true,
  }
);

const AvanceClientes = mongoose.model("AvanceClientes", avanceSchema);

export default AvanceClientes;
