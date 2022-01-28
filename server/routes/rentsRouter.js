import { Router } from "express";
import { RentsControllers } from "../controllers/index.js";
import { authVerify } from "../middlewares/index.js";

const rentsRouter = Router();

rentsRouter.get("/:id", authVerify, RentsControllers.getRent);
rentsRouter.put("/new", authVerify, RentsControllers.addRent);

export { rentsRouter };
