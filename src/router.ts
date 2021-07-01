import { Router } from "express";
import { userRouter } from "./routers/user.router";

export const router = Router();

router.use(userRouter);
