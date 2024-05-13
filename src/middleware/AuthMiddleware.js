import jwt from "jsonwebtoken";
import Usuarios from "../Models/Usuarios.js";

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
            const usaurio = await Usuarios.findById(decoded.id).select(
                "-password_usu"
            );
            req.usuario = usaurio;
            

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