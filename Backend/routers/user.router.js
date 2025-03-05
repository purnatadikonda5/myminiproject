import { Router } from "express";
import * as UserController from "../controllers/UserController.js";
import * as authmiddleware from '../middlewares/auth.middleware.js';
import { body } from "express-validator";
const router= Router();

router.post("/register",
    body('email').isEmail().withMessage("email should valid email address"),
    body('password').isLength({min:3}).withMessage("password should have minlength of 3"),
    UserController.CreateUserController)

router.post("/login",
    body('email').isEmail().withMessage("email should valid email address"),
    body('password').isLength({min:3}).withMessage("password should have minlength of 3"),
    UserController.LoginController)

router.get("/profile",authmiddleware.authUser,UserController.ProfileController);
export default router;

router.post("/logout",authmiddleware.authUser,UserController.LogoutController);