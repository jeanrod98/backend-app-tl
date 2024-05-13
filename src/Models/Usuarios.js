import mongoose from "mongoose";
import generarToken from "../helpers/generarToken.js";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema(
  {
   
    nombres_usu: {
        type: String,
        trim: true,
        require: true,
      },
    correo_usu: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    password_usu: {
      type: String,
      trim: true,
      require: true,
    },
    
    tipo_usu: {
        type: String,
        require: true,
      },
    token_usu: {
      type: String,
      default: generarToken(),
    },
    userCreatedAt: {
      type: String,
      trim: true,
      default: new Date().toLocaleString('EC')
    },
    userUpdatedAt: {
      type: String,
      trim: true,
      default: new Date().toLocaleString('EC')
    },
  },
  {
    timestamps: true,
  }
);

// Encriptar Contrasenia
//Hashear la password antes de guardar
usuarioSchema.pre("save", async function (next) {
  //Controla si el password ya fue hasheado no se ejecuta
  if (!this.isModified("password_usu")) {
    next();
  }

  //configura el salt para el hasheo
  const salt = await bcrypt.genSalt(10);
  this.password_usu = await bcrypt.hash(this.password_usu, salt);
});

// Verificar el password para login
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password_usu);
};

const Usuarios = mongoose.model("Usuarios", usuarioSchema);

export default Usuarios;
