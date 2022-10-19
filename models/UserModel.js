import { Schema, model } from "mongoose";

const UserModel = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isActivated: { type: Boolean, default: false },
    activatedLink: { type: String, require: true }
})

export default model("UserModel", UserModel);