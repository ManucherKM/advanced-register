import UserService from "../service/UserService.js";
import { validationResult } from "express-validator";

class UserController {

    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Невалидный логин или пароль"
                })
            }

            const { email, password } = req.body;

            const user = await UserService.login(email, password)

            res.cookie("refreshToken", user.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 60 * 1000, //Токен будет работать 30 дней
                httpOnly: true                         //Пользователь не сможет изменять куки в браузере
            })
            res.status(200).json({ ...user })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Неверный логин или пароль"
            })
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Невалидный логин или пароль"
                })
            }

            const user = await UserService.register(req.body.email, req.body.password);
            
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 60 * 1000, //Токен будет работать 30 дней
                httpOnly: true                         //Пользователь не сможет изменять куки в браузере
            })
            
            return res.status(200).json(user)
        } catch (e) {
            console.log(e);
            res.status(401).json({
                message: "Не удалось создать учетную запись"
            })
        }
    }

    async getUsers(req, res) {
        try {
            res.json(123)
        } catch (e) {
            console.log(e);
            res.status(401).json({
                message: "Отказано в доступе"
            })
        }
    }

    async activateLink(req, res) {
        try {
            const link = req.params.link;

            await UserService.activate(link)

            return res.redirect(process.env.URL_CL)
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Не удалось подтвердить учетную запись"
            })
        }
    }

    async logout(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Не удалось выйти из учетной записи"
            })
        }
    }

    async refresh(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Не удалось получить токен"
            })
        }
    }
}

export default new UserController;