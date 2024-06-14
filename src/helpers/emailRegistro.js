import nodemailer from 'nodemailer';

const emailRegistro = async ( datos ) => {

    let transporter = nodemailer.createTransport({
        host: process.env.HOST_MAILER,
        port: process.env.PORT_MAILER,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.AUTH_USER_MAILER, // generated ethereal user
          pass: process.env.AUTH_PASS_MAILER, // generated ethereal password
        },
    });

    // transporter.verify().then(() => {
    //     console.log("listo para enviar correo");
    // })

    //Enviar el email
    const { nombres, correo, token} = datos;

    const info = await transporter.sendMail({
        from: "MAVE",
        to: correo,
        subject: "Creación de cuenta en MAVE",
        text: "Creación de cuenta en MAVE",
        html: `<p>Hola ${nombres}, has creado una cuenta en Mave.</p>
        <p>Tu cuenta ya se encuentra lista para usarla, recuerda que tu cuenta es de usuario REGULAR, por lo que tiene ciertas restricciones.</p>
        <b>Si tú no creaste esta cuenta, puedes ignorar este mensaje!</b>`,
    });
{/* <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Comprobar Cuenta</a></p> */}
    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro