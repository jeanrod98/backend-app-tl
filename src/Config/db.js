import mongoose from "mongoose";

const conectarDB = async () => {
    try {

        const db = await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gdtlrvp.mongodb.net/maveTLDB`,
            
        );
        

        // Captura el host y el puerto utilizado para la conexion y lo muestra en consola
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;