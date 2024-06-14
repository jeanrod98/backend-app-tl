import { Router } from "express"
import { autenticarUsuario, registrarUsuario, perfilUsuario, actualizarPerfil, cambiarPassword } from "../Controllers/UsuarioControllers.js";
import checkAuth from "../middleware/AuthMiddleware.js";

 const router = Router()


router.post("/registro-usuario", registrarUsuario);
router.post("/login", autenticarUsuario);

router.put("/profile-update/:id", actualizarPerfil);
router.put("/profile-update-password/:id", cambiarPassword);

// rutas privadas
router.get("/perfil", checkAuth, perfilUsuario);


 export default router;