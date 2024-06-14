import Usuarios from "../Models/Usuarios.js";
import emailRegistro from "../helpers/emailRegistro.js";
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
      correo_usu: correo.toLowerCase(),
      nombres_usu: nombres.toUpperCase(),
      password_usu: password,
      tipo_usu: "Regular",
      telefono_usu: "N/A",
      direccion_usu: "N/A",
      cedula_usu: "N/A",
      userCreatedAt: nombres.toUpperCase(),
    });
    const usuariosGuardados = await usuario.save();



     //* Enviar el correo 
     emailRegistro({
      correo: usuariosGuardados.correo_usu,
      nombres: usuariosGuardados.nombres_usu.toUpperCase(),
      token: usuariosGuardados.token_usu,
    });

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
          nombres_usu: usuario.nombres_usu,
          correo_usu: usuario.correo_usu,
          token_usu: usuario.token_usu,
          token_session: generarJWT(usuario._id),
          tipo_usu: usuario.tipo_usu,
          telefono_usu: usuario.telefono_usu,
          direccion_usu: usuario.direccion_usu,
          cedula_usu: usuario.cedula_usu,

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

  const actualizarPerfil = async (req, res) => {

      // console.log(req.params);
      const { id } = req.params;
   
      try {
          const usuarioEncontrado = await Usuarios.findById(id);
  
          if (!usuarioEncontrado) {
              const error = new Error("El usuario no fue encontrado.");
              return res.status(400).json({ msg: error.message});
  
              
          }
  
          usuarioEncontrado.nombres_usu = req.body?.nombres_usu.toUpperCase() || usuarioEncontrado.nombres_usu;
          usuarioEncontrado.correo_usu = req.body?.correo_usu.toLowerCase() || usuarioEncontrado.correo_usu;
          usuarioEncontrado.telefono_usu = req.body?.telefono_usu || usuarioEncontrado.telefono_usu;
          usuarioEncontrado.direccion_usu = req.body?.direccion_usu || usuarioEncontrado.direccion_usu;
          usuarioEncontrado.cedula_usu = req.body?.cedula_usu || usuarioEncontrado.cedula_usu;
          usuarioEncontrado.tipo_usu = req.body?.tipo_usu || usuarioEncontrado.tipo_usu;
          usuarioEncontrado.userUpdatedAt = req.body?.nombres_usu.toUpperCase() || usuarioEncontrado.userUpdatedAt;
         
          
  
          const usuarioGuardado = await usuarioEncontrado.save();
  
          res.json(usuarioGuardado);
          
      } catch (error) {
          console.log(error);
      }
  
  


  };

  const cambiarPassword = async (req, res) => {
    const { id } = req.params;
    const { password_usu, nueva_password_usu } = req.body;
  
    const usuario = await Usuarios.findById({ _id: id });
  
    if (!(await usuario.comprobarPassword(password_usu))) {
      const e = new Error("La contraseña es incorrecta.");
      return res.status(403).json({ msg: e.message, error: true });
    }
  
    try {
      //*  Actualizar password
      usuario.password_usu = nueva_password_usu;
      await usuario.save();
      res.json({ msg: "La contraseña fue actualizada con éxito." });
    } catch (error) {
      console.log(error);
    }
  };

export { registrarUsuario, autenticarUsuario, perfilUsuario, actualizarPerfil, cambiarPassword};
