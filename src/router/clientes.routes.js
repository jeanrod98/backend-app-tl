import { Router } from "express"
import { registrarCliente, actualizarCliente, consultarClienteId, eliminarCliente, cambiarPassword } from "../Controllers/clienteControllers.js";
import checkAuth from "../middleware/AuthMiddleware.js";


 const router = Router()

router.get("/clientes/:id", consultarClienteId)
router.post("/registro-cliente", registrarCliente);

router.put("/client-update/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);


router.put("/profile-update-password-cliente/:id", cambiarPassword);




 export default router;