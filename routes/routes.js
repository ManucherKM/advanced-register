import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = new Router;

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activateLink)
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);

export default router;