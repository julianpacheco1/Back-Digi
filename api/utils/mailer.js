const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "figuritarepetidaecommerce@gmail.com",
    pass: "yltzaditbtbkoogd",
  },
});

exports.response = function (email, formUrl, formTitle) {
  transporter.sendMail({
    from: '"Formidable" <formidable@gmail.com>',
    to: email,
    subject: "Formulario",
    html: `<b>Hola: <br> Te compartieron un formulario. Por favor, sigue el enlace para completarlo: <br> <a href=${formUrl}>${formTitle}</a> <br>  Saludos, el equipo de Formidable.</b>`,
  });
};

exports.confirm = function (email, name, confimUrl) {
  transporter.sendMail({
    from: '"Formidable" <formidable@gmail.com>',
    to: email,
    subject: "Confirmación",
    html: `<b>Hola: ${name} <br> Por favor, confirma que quieres crear un usuario de Formidable: <br> <a href=${confimUrl}>Confimar</a> <br>  Saludos, el equipo de Formidable.</b>`,
  });
};
