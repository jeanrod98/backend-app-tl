import jwt from "jsonwebtoken";
import Usuarios from "../Models/Usuarios.js";
import Clientes from "../Models/Clientes.js";

const checkAuth = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;
  //Comprobar que existe el token en la autorizacion
  // console.log(authorization);
  if (authorization && authorization.startsWith("Bearer")) {
    // Si tiene el token con bearer  comprobar;
    try {
      //Quitar la palabra Bearer del Token
      token = authorization.split(" ")[1];

      // decodificar informacion del JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      // Buscar el usuario en la bd
      //extrae datos sin contraseña
      const usuario = await Usuarios.findById(decoded.id).select(
        "-password_usu"
      );

      
      if (usuario?.nombres_usu) {
        req.usuario = {
            _id: usuario._id,
          nombres: usuario.nombres_usu,
          correo: usuario.correo_usu,
          cedula: usuario.cedula_usu,
          tipo: usuario.tipo_usu,
          telefono: usuario.telefono_usu,
          direccion: usuario.direccion_usu,
          token: usuario.token_usu,
          userCreatedAt: usuario.userCreatedAt,
          userUpdatedAt: usuario.userUpdatedAt,
          createdAt: usuario.createdAt,
          updatedAt: usuario.updatedAt,
        };
      } else {
        const cliente = await Clientes.findById(decoded.id).select(
          "-password_cli"
        );
        // console.log(cliente);
        req.usuario = {
            _id: cliente._id,
          nombres: cliente.nombres_cli,
          correo: cliente.correo_cli,
          cedula: cliente.cedula_cli,
          tipo: cliente.tipo_cli,
          terapeuta_cli: cliente.terapeuta_cli,
          telefono: cliente.telefono_cli,
          direccion: cliente.direccion_cli,
          token: cliente.token_cli,
          userCreatedAt: cliente.userCreatedAt,
          userUpdatedAt: cliente.userUpdatedAt,
          createdAt: cliente.createdAt,
          updatedAt: cliente.updatedAt,
        };
      }

      return next();
    } catch (e) {
      const error = new Error("Token no valido.");
      res.status(403).json({ msg: error.message });
    }
  }

  //Si no hay token o no tiene Bearer se muestra alerta
  if (!token) {
    const error = new Error("Token no valido o inexistente.");
    res.status(403).json({ msg: error.message });
  }

  //   next();
  // console.log();
  //
};

export default checkAuth;
