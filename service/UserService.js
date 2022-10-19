import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import { v4 } from "uuid"
import MailService from "./MailService.js";
import UserDtos from "../dtos/UserDtos.js"
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
}

export default new UserService