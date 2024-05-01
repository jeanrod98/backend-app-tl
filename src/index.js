import express from 'express';
import cors from "cors";
import 'dotenv/config';

const app = express();


app.use(cors());

const PORT = process.env.PORT || 4000;


app.listen(() => {
    console.log(`Servidor iniciado en el puerto: ${PORT}`);
})