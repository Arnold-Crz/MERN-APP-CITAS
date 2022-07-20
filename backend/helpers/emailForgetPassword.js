import nodemailer from 'nodemailer';

export const emailForgetPassword = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
      user: process.env.USER_MAILTRAP,
      pass: process.env.PASS_MAILTRAP,
    },
  });

  const { name, email, token } = data;

  const info = await transport.sendMail({
    from: 'APV ADMNISTRADOR DE CLINICA',
    to: email,
    subject: 'Restablece tu password',
    text: 'Restablece tu password',
    html: `<p>Hola:${name}, has solicitado restablecer tu password.</p>
      <p>Tu cuenta ya esta lista, solo falta comprobarla para hacerlo has click en el siguinte enlace:
      <a href="${process.env.URL_MAILTRAP}/olvide-password/${token}">Restablecer Password</a></p>

      <p>Si tu no creastes esta cuenta puedes ignorar este mensaje</p>
      `,
  });

  console.log('Mensaje enviado %s', info.messageId);
};
