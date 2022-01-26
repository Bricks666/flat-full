import { Router } from "express";
import { authRouter } from "./authRouter.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

export { appRouter };
