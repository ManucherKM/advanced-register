import { body } from "express-validator";

export const login = [
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 25 })
]

export const register = [
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 25 })
]