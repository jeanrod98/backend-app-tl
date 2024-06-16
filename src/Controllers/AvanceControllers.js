import AvanceClientes from "../Models/AvanceClientes.js";
import Clientes from "../Models/Clientes.js";
import DetalleAvances from "../Models/DetalleAvances.js";

const consultarAvanceId = async (req, res) => {
  const { id } = req.params;

  try {
    //   const avance = await AvanceClientes.find({ paciente_av: id });
    const cliente = await Clientes.findOne({ _id: id});

    const avance = await AvanceClientes.aggregate([
      { "$match": { "paciente_av": cliente._id } },
      {
        $lookup: {
          from: "detalleavances",
          foreignField: "id_avance_det",
          localField: "_id",
          as: "detalles",
        },
      },
    ]);
    // console.log(avance);
    if (avance.length > 0) {
      res.json(avance);
    } else {
      const error = new Error("EL avance especificado no existe.");
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

const registrarAvance = async (req, res) => {
  const {
    usuario,
    modulo,
    fecha_avance,
    id_cliente,
    id_terapeuta,
    aciertos,
    errores,
    tiempo,
  } = req.body;
  // console.log(req.body);

  //Comprobar AVANCE existe
  const existeAvance = await AvanceClientes.findOne({ fecha_av: fecha_avance });

  try {
    // todo: Si existe el avance entonces se registra el detalle
    if (existeAvance) {
      //   const error = new Error("ESTA FECHA YA ESTÁ REGISTRADA.");
      //   //retorna mensaje de error
      //   return res.status(400).json({ msg: error.message, error: true });

      //Guardar un nuevo Detalle de avance
      const detalle = new DetalleAvances({
        id_avance_det: existeAvance._id,
        aciertos_pro_av: aciertos,
        errores_pro_av: errores,
        tiempo_modulo_av: tiempo,
        userCreatedAt: usuario?.toUpperCase(),
        userUpdatedAt: usuario?.toUpperCase(),
      });
      await detalle.save();

      // todo: Si NO existe el avance entonces se registra el Avance y el detalle
    } else {
      const avance = new AvanceClientes({
        terapeuta_av: id_terapeuta,
        paciente_av: id_cliente,
        nombreModulo_av: modulo,
        fecha_av: fecha_avance,
        userCreatedAt: usuario?.toUpperCase(),
        userUpdatedAt: usuario?.toUpperCase(),
      });
      const avanceRegistrado = await avance.save();

      //Guardar un nuevo Detalle de avance
      const detalle = new DetalleAvances({
        id_avance_det: avanceRegistrado._id,
        aciertos_pro_av: aciertos,
        errores_pro_av: errores,
        tiempo_modulo_av: tiempo,
        userCreatedAt: usuario?.toUpperCase(),
        userUpdatedAt: usuario?.toUpperCase(),
      });
      await detalle.save();
    }

    // console.log(ClienteRegistrado);
    res.json({ msg: "Datos del avance registrados" });
  } catch (error) {
    console.log(error);
    console.log("CLIENTE REGISTRO");
  }
};

export { consultarAvanceId, registrarAvance };
