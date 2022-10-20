import jwt from "jsonwebtoken"
import TokenModel from "../models/TokenModel.js"

class TokenService {
    createTokens(user) {
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "2h" });
        const refreshToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "30d" });
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const UserWithToken = await TokenModel.findOne({ user: userId });

        if (UserWithToken) {
            UserWithToken.refresh = refreshToken;
            return UserWithToken.save()
        }

        const newRefresh = await TokenModel.create({
            user: userId,
            refresh: refreshToken
        })
        return newRefresh;
    }
}

export default new TokenService