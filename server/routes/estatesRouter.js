import { Router } from "express";
import { EstatesControllers } from "../controllers/index.js";
import { authVerify, accessVerify } from "../middlewares/index.js";

const estatesRouter = Router();

estatesRouter.get("/", EstatesControllers.getEstates);
estatesRouter.get("/my", authVerify, EstatesControllers.getMyEstates);
estatesRouter.put(
	"/new",
	authVerify,
	accessVerify,
	EstatesControllers.addEstate
);

export { estatesRouter };
