const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.PAWS_EMAIL,
    pass: process.env.PAWS_PASSWORD,
  },
});
mailTransporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.resolve("./utils/nodemailer/views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./utils/nodemailer/views/"),
  })
);

const sendMail = (user_email, user_name) => {
  let mailDetails = {
    from: process.env.PAWS_EMAIL,
    to: user_email,
    subject: "Voila!! Welcome to Paws Adoption",
    template: "welcome",
    context: {
      name: user_name, // replaces {{name}} in template
    },
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully", data);
    }
  });
};

module.exports = { sendMail };
