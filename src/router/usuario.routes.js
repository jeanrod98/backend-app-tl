import { Router } from "express"
import { autenticarUsuario, registrarUsuario, perfilUsuario } from "../Controllers/UsuarioControllers.js";
import checkAuth from "../middleware/AuthMiddleware.js";

 const router = Router()


router.post("/registro-usuario", registrarUsuario);
router.post("/login", autenticarUsuario);

// rutas privadas
router.get("/perfil", checkAuth, perfilUsuario);


 export default router;