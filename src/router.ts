import { Router } from "express";
import { userRouter } from "./routers/user.router";
import { authRouter } from "./routers/auth.router";

export const router = Router();

router.use(userRouter);
router.use(authRouter);
