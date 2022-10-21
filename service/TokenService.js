import jwt from "jsonwebtoken"
import TokenModel from "../models/TokenModel.js"

class TokenService {
    createTokens(user) {
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "2h" });
        const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
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

    async deleteToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        console.log(tokenData);
        return tokenData;
    }

    verifyAccessToken(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return data
        } catch (e) {
            console.log(e);
            return null
        }
    }

    verifyRefreshToken(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return data
        } catch (e) {
            console.log(e);
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({ refreshToken });

        if (!token) {
            return null
        }

        return token
    }
}

export default new TokenService