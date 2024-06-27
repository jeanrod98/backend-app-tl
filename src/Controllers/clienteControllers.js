import Clientes from "../Models/Clientes.js";
import Usuarios from "../Models/Usuarios.js";
import { emailRegistroCliente } from "../helpers/emailRegistro.js";

// *Consultar todos los usuarios
const consultarClienteId = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Clientes.find({ terapeuta_cli: id }).select("-password_cli");
    //   console.log(cliente);
    if (cliente.length > 0) {
      res.json(cliente);
    } else {
      const error = new Error("EL cliente especificado no existe.");
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

// * Registrar Cliente
const registrarCliente = async (req, res) => {
  // console.log("Registrado");
  // console.log(req.body);

  const { nombres, correo, cedula, telefono, direccion, usuario, usuario_id } =
    req.body;
  // console.log(req.body);

  //Comprobar Cliente duplicado
  const existeClienteCorreo = await Clientes.findOne({ correo_cli: correo });
  //Comprobar Usuario duplicado

  const existeUsuarioCorreo = await Usuarios.findOne({ correo_usu: correo });

  // REVISAR EL CORREO
  if (existeClienteCorreo || existeUsuarioCorreo) {
    const error = new Error("EL CORREO YA ESTÁ OCUPADO POR UN USUARIO/CLIENTE.");
    //retorna mensaje de error
    return res.status(400).json({ msg: error.message, error: true });
  }

  try {
    //Guardar un nuevo Cliente
    const cliente = new Clientes({
      correo_cli: correo.toLowerCase(),
      nombres_cli: nombres.toUpperCase(),
      password_cli: cedula,
      tipo_cli: "Cliente",
      telefono_cli: telefono,
      direccion_cli: direccion,
      cedula_cli: cedula,
      userCreatedAt: usuario.toUpperCase(),
      userUpdatedAt: usuario.toUpperCase(),
      terapeuta_cli: usuario_id,
    });
    const clientesGuardados = await cliente.save();

    //* Enviar el correo
    emailRegistroCliente({
      correo: clientesGuardados.correo_cli,
      nombres: clientesGuardados.nombres_cli.toUpperCase(),
      token: clientesGuardados.token_cli,
      tipo: "Cliente",
      cedula: clientesGuardados.cedula_cli,
    });

    // console.log(ClienteRegistrado);
    res.json(clientesGuardados);
  } catch (error) {
    console.log(error);
    console.log("CLIENTE REGISTRO");
  }
};

const actualizarCliente = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  try {
    const clienteEncontrado = await Clientes.findById(id);

    if (!clienteEncontrado) {
      const error = new Error("El cliente no fue encontrado.");
      return res.status(400).json({ msg: error.message });
    }

    clienteEncontrado.nombres_cli =
      req.body?.nombres.toUpperCase() || clienteEncontrado.nombres_cli;
    clienteEncontrado.correo_cli =
      req.body?.correo.toLowerCase() || clienteEncontrado.correo_cli;
    clienteEncontrado.telefono_cli =
      req.body?.telefono || clienteEncontrado.telefono_cli;
    clienteEncontrado.direccion_cli =
      req.body?.direccion || clienteEncontrado.direccion_cli;
    clienteEncontrado.cedula_cli =
      req.body?.cedula || clienteEncontrado.cedula_cli;
    clienteEncontrado.tipo_cli = req.body?.tipo || clienteEncontrado.tipo_cli;
    clienteEncontrado.userUpdatedAt =
      req.body?.usuario.toUpperCase() || clienteEncontrado.userUpdatedAt;

    const clienteGuardado = await clienteEncontrado.save();

    res.json({
        _id: clienteGuardado._id,
          nombres: clienteGuardado.nombres_cli,
          correo: clienteGuardado.correo_cli,
          cedula: clienteGuardado.cedula_cli,
          tipo: clienteGuardado.tipo_cli,
          terapeuta_cli: clienteGuardado.terapeuta_cli,
          telefono: clienteGuardado.telefono_cli,
          direccion: clienteGuardado.direccion_cli,
          token: clienteGuardado.token_cli,
          userCreatedAt: clienteGuardado.userCreatedAt,
          userUpdatedAt: clienteGuardado.userUpdatedAt,
          createdAt: clienteGuardado.createdAt,
          updatedAt: clienteGuardado.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

// eliminar usuario
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    //encontrar la cita
  
    try {
      const cliente = await Clientes.findById(id);
      // console.log(id);
      // console.log(req.body);
      // si la cita no existe termina el proceso
      if (!cliente) {
        return res.status(400).json({ msg: "EL CLIENTE NO FUE ENCONTRADO." });
      }
      // console.log( JSON.stringify(Cliente._id) === `"65529e6d121ec1126be9611f"`);
  
   
  
      // ELIMINAR EL Cliente
      const clienteEliminado = await cliente.deleteOne();
  
      //formatear respuesta
      res.json(clienteEliminado);
    } catch (error) {
      console.log(error);
      const err = new Error("HUBO UN ERROR AL ELIMINAR EL CLIENTE.");
      //retorna mensaje de error
      return res.status(400).json({ msg: err.message });
    }
  };

  const cambiarPassword = async (req, res) => {
    const { id } = req.params;
    const { password, nueva_password } = req.body;
  
    const cliente = await Clientes.findById({ _id: id });
  
    if (!(await cliente.comprobarPassword(password))) {
      const e = new Error("La contraseña es incorrecta.");
      return res.status(403).json({ msg: e.message, error: true });
    }
  
    try {
      //*  Actualizar password
      cliente.password_cli = nueva_password;
      await cliente.save();
      res.json({ msg: "La contraseña fue actualizada con éxito." });
    } catch (error) {
      console.log(error);
    }
  };


export { consultarClienteId, registrarCliente, actualizarCliente, eliminarCliente, cambiarPassword };
