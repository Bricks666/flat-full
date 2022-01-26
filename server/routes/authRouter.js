import { Router } from "express";
import { UserControllers } from "../controllers/index.js";

const authRouter = Router();

authRouter.get("/", UserControllers.auth);
authRouter.post("/login", UserControllers.login);
authRouter.put("/registration", UserControllers.registration);
authRouter.delete("/logout", UserControllers.logout);
authRouter.get("/refresh", UserControllers.refresh);

export { authRouter };
