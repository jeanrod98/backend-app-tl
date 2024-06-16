import express from 'express';
import cors from "cors";
import 'dotenv/config';

import conectarDB from "./Config/db.js";
import usuarioRoutes from "./router/usuario.routes.js";
import clientesRoutes from "./router/clientes.routes.js";
import avanceRoutes from "./router/avance.routes.js";

const app = express();

//Middleware
//habilita req.body para leer formularios
app.use(express.json());

app.use(cors());


// Conexion a la base de datos en mongo DB 
conectarDB();


// Definir rutas

app.use('/api/v1', usuarioRoutes);
app.use('/api/v1', clientesRoutes);
app.use('/api/v1', avanceRoutes);

const PORT = process.env.PORT || 4000;


app.listen( PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${PORT}`);
})