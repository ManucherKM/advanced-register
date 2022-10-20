import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import { v4 } from "uuid"
import UserDtos from "../dtos/UserDtos.js"
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";

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
}

export default new UserService