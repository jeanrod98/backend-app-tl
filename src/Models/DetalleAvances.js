import mongoose from "mongoose";

const detalleAvanceSchema = mongoose.Schema(
  {
    id_avance_det: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "avanceclientes",
    },
    aciertos_pro_av: {
      type: Number,
      default: null,
    },
    errores_pro_av: {
      type: Number,
      trim: true,
      require: true,
    },
    intentos_pro_av: {
      type: Number,
      trim: true,
      require: true,
    },
    promedio_pro_av: {
      type: Number,
      trim: true,
      require: true,
    },

    tiempo_modulo_av: {
      type: Number,
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

const DetalleAvances = mongoose.model("DetalleAvances", detalleAvanceSchema);

export default DetalleAvances;
