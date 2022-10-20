import { Router } from "express";
import UserController from "../controller/UserController.js";
import * as Validations from "../validations/validations.js"

const router = new Router;

router.post("/login", Validations.login, UserController.login);
router.post("/register", Validations.register, UserController.register);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activateLink)
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);

export default router;