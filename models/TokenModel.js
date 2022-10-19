import { Schema, model } from "mongoose";

const TokenModel = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "UserModel" },
    refresh: { type: String, require: true },
})

export default model("TokenModel", TokenModel);