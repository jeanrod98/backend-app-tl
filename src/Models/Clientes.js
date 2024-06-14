import mongoose, { Model, Mongoose } from "mongoose";
import generarToken from "../helpers/generarToken.js";
import bcrypt from "bcrypt";

const clienteSchema = mongoose.Schema(
  {
    terapeuta_cli: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    nombres_cli: {
      type: String,
      trim: true,
      require: true,
    },
    correo_cli: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    cedula_cli: {
      type: String,
      default: null,
    },
    password_cli: {
      type: String,
      trim: true,
      require: true,
    },

    tipo_cli: {
      type: String,
      require: true,
    },
    telefono_cli: {
      type: String,
      default: null,
    },
    direccion_cli: {
      type: String,
      default: null,
    },
    token_cli: {
      type: String,
      default: generarToken(),
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

// Encriptar Contrasenia
//Hashear la password antes de guardar
clienteSchema.pre("save", async function (next) {
  //Controla si el password ya fue hasheado no se ejecuta
  if (!this.isModified("password_cli")) {
    next();
  }

  //configura el salt para el hasheo
  const salt = await bcrypt.genSalt(10);
  this.password_cli = await bcrypt.hash(this.password_cli, salt);
});

// Verificar el password para login
clienteSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password_cli);
};

const Clientes = mongoose.model("Clientes", clienteSchema);

export default Clientes;
