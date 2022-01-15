const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const smtEndpoint = "email-smtp.sa-east-1.amazonaws.com";
const port = 535;
const smtpUsername = "";
const smtpPassword = "";
var tag0 = "key0=value0";
var tag1 = "key1=value1";

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("El servidor escucha por el puerto 3000");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Se conectó a la base de datos <br><br>😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`El correo se envió 😃 con el siguiente id ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    port: port,
    host: smtEndpoint,
    secure: false, 
    auth: {
      user: details.email,
      pass: details.password
    },
    debug: true
  });

  let mailOptions = {
    from: '"👋¡REGISTRO Existoso!📩"<example.gimail.com>', 
    to: user.email, 
    subject: "Bienvenido a nuestra plataforma de cursos de la ESPE",
    html: `
    <div style="text-aling: center;">
      <img style="width: 200px; text-aling: center;" src="https://drive.google.com/uc?export=view&id=${user.figuracurso}">
    </div>
    <h1> ¡Hola! ${user.name} </h1>
    <p> Gracias por inscribirte a nuestro curso de ${user.curso} el cual tiene el costo
        de ${user.costo} dólares, por ser un ${user.persona} tiene un descuento de ${user.descuento}% por lo que
        pagará únicamente el valor de $${user.costoTotal} </p>

    <h4>¡Gracias por preferirnos!🎅</h4>
    <h5>Si tienes dudas, contáctate con nosotros.</h5>`,
    headers: {
      'X-SES-MESSAGE-TAGS': tag0,
      'X-SES-MESSAGE-TAGS': tag1
    }
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
