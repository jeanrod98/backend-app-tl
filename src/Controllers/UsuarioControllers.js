import Usuarios from "../Models/Usuarios.js";
import generarJWT from "../helpers/generarJWT.js";

// * Registrar usuario
const registrarUsuario = async (req, res) => {
  // console.log("Registrado");
  // console.log(req.body);

  const { nombres, correo, password } = req.body;
  // console.log(req.body);

  //Comprobar usuario duplicado
  const existeUsuarioCorreo = await Usuarios.findOne({ correo_usu: correo });

  // REVISAR EL CORREO
  if (existeUsuarioCorreo) {
    const error = new Error("EL CORREO YA ESTÁ OCUPADO POR UN USUARIO.");
    //retorna mensaje de error
    return res.status(400).json({ msg: error.message, error: true });
  }

  try {
    //Guardar un nuevo usuario
    const usuario = new Usuarios({
      correo_usu: correo,
      nombres_usu: nombres,
      password_usu: password,
      tipo_usu: "Regular"
    });
    const usuariosGuardados = await usuario.save();

    // console.log(usuarioRegistrado);
    res.json(usuariosGuardados);
  } catch (error) {
    console.log(error);
    console.log("usuario REGISTRO");
  }
};

const autenticarUsuario = async (req, res) => {
    const { correo, password } = req.body;

    //comproba si el ususario existe
  
    const usuario = await Usuarios.findOne({ correo_usu: correo });
    console.log(usuario);
  
    if (!usuario) {
      const error = new Error("EL USUARIO NO EXISTE.");
      return res.status(404).json({ msg: error.message });
    }
  
    // authenticacion con usuario
    if (usuario) {
      if (await usuario.comprobarPassword(password)) {
        // consultar el tipo de usuario 
  
        return res.json({
          _id: usuario._id,
          nombres: usuario.nombres_usu,
          correo: usuario.correo_usu,
          token_cuenta: usuario.token_usu,
          token_session: generarJWT(usuario._id),
          tipo: usuario.tipo_usu,
        });
      } else {
        const error = new Error("LA CONTRASEÑA ES INCORRECTA.");
        return res.status(403).json({ msg: error.message });
      }
    }
  
    
};

// Perfil usuario
const perfilUsuario = (req, res) => {
    const { usuario } = req;
  
    // console.log(usuario);
    res.json(usuario);
  };

export { registrarUsuario, autenticarUsuario, perfilUsuario};
