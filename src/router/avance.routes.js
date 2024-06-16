import { Router } from "express"
import { consultarAvanceId, registrarAvance } from "../Controllers/AvanceControllers.js";


 const router = Router()

router.get("/avance/:id", consultarAvanceId)
router.post("/avance-registro", registrarAvance);

// router.put("/detalle-update/:id", actualizarCliente);




 export default router;