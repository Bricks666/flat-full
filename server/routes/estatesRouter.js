import { Router } from "express";
import { EstatesControllers } from "../controllers";
import { authVerify } from "../middlewares/index.js";

const estatesRouter = Router();

estatesRouter.get("/:id", authVerify, EstatesControllers.getEstate);
