const nodemailer = require("nodemailer");

const SendEmail = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: "587",
    auth: { 
        user: "contato@consultnew.app.br",
        pass: "Contato088*"
    }
});

SendEmail.sendMail({
    from: "contato@consultnew.app.br",
    to: "roger08reis@gmail.com",
    replyTo: "contato@consultnew.app.br",
    subject: "Assunto do Email",
    text: "Ola seja Bem Vindo!"
}).then(info => {
    console.log(info);
}).catch(error => {
    console.log(error)
});