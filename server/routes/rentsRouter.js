import { Router } from "express";
import { RentsControllers } from "../controllers/index.js";
import { authVerify } from "../middlewares/index.js";

const rentsRouter = Router();

rentsRouter.get("/", authVerify, RentsControllers.getRents);
rentsRouter.get("/my", authVerify, RentsControllers.getRentsByOwner);
rentsRouter.put("/new", authVerify, RentsControllers.addRent);

export { rentsRouter };
