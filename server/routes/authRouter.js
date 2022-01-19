import { Router } from "express";

const authRouter = Router();

authRouter.get("/");
authRouter.post("/login");
authRouter.put("/registration");
authRouter.delete("/logout");

export { authRouter };
