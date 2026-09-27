import { Router } from "express"
import * as authController from "../controller/auth.controller.js";

const authRouter = Router()

// */**
//     complete endpoint - api/auth/register
// */

authRouter.post("/register", authController.register)

authRouter.get("/get-me", authController.getMe)

export default authRouter

