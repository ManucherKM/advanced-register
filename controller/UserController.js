import UserService from "../service/UserService.js";

class UserController {

    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async register(req, res, next) {
        try {
            const user = await UserService.register(req.body.email, req.body.password);
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 60 * 1000, //Токен будет работать 30 дней
                httpOnly: true                         //Пользователь не сможет изменять куки в браузере
            })
            return res.status(200).json(user)
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(123)
        } catch (e) {
            console.log(e);
        }
    }

    async activateLink(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserController;