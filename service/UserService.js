import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import { v4 } from "uuid"
import UserDtos from "../dtos/UserDtos.js"
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import TokenModel from "../models/TokenModel.js";

class UserService {
    
    async register(email, password) {

        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error("Пользователь с такой почтой уже существует");
        }
        const passwordHash = await bcrypt.hash(password, 5)

        const Link = v4();

        const user = await UserModel.create({
            email: email,
            password: passwordHash,
            activatedLink: Link
        });

        await MailService.sendLink(email, `${process.env.URL_API}/activate/${Link}`);

        const filterUser = new UserDtos(user);

        const tokens = TokenService.createTokens({ ...filterUser });
        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: filterUser
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error("Пользователь не найден")
        }

        const isPassword = bcrypt.compare(password, user.password)

        if (!isPassword) {
            throw new Error("Неверный пароль")
        }

        const filterUser = new UserDtos(user._doc);

        const tokens = TokenService.createTokens({ ...filterUser })

        await TokenService.saveToken(filterUser.id, tokens.refreshToken)

        return { ...tokens, user: filterUser }

    }

    async activate(link) {
        const user = await UserModel.findOne({ link });
        if (!user) {
            throw new Error("Неверная ссылка активации");
        }

        user.isActivated = true;

        user.save()
    }

    async logout(refreshToken) {
        const token = await TokenService.deleteToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw new Error("Неверный refresh токен")
        }

        const tokenVerify = TokenService.verifyRefreshToken(refreshToken);

        const tokenInBD = await TokenService.findToken(refreshToken);

        if (!tokenVerify || !tokenInBD) {
            throw new Error("Пользователь не авторизован");
        }

        const user = await UserModel.findById(tokenInBD.user);

        const filterUser = new UserDtos(user._doc);

        const tokens = TokenService.createTokens({ ...filterUser })

        await TokenService.saveToken(filterUser.id, tokens.refreshToken)

        return { ...tokens, user: filterUser }
    }
}

export default new UserService