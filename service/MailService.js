import dotenv from "dotenv";
dotenv.config()
import nodemailer from "nodemailer";

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        })
    }


    async sendLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
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