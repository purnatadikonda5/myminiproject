import { Router } from "express";
import { body } from "express-validator";
import * as ProjectController from '../controllers/projectController.js'
import * as authmiddleware from "../middlewares/auth.middleware.js";
const router= Router();

router.post("/create",
    body('name').isString().withMessage("Name should be a string"),
    authmiddleware.authUser,
    ProjectController.CreateProjectController)

router.get("/all",
    authmiddleware.authUser,
    ProjectController.getAllprojects
)

router.put("/add-user",
    authmiddleware.authUser,
    body("users")
    .isArray({ min: 1 }).withMessage("Users field must be a non-empty array"),
    body("users.*")
    .isString().withMessage("Each user ID must be a string")
    .isLength({ min:1, max: 40 }).withMessage("Each user ID must be a valid 24-character string"),
    ProjectController.addUsertoProject
)

router.get("/get-project/:projectId",authmiddleware.authUser,ProjectController.getProject)

export default router;

