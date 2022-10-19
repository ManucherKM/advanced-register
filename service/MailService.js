import nodemailer from "nodemailer";

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "",
                pass: "qiraqvpjdcjemuat",
            },
        })
    }


    async sendLink(to, link) {
        await this.transporter.sendMail({
            from: "",
            to: to,
            subject: "Hello",
            text: "Hello world?",
            html: `
            <h1>Для активации перейдите по ссылке ниже</h1>
            <a href="${link}">Ссылка</a>
                `
        })
    }
}

export default new MailService