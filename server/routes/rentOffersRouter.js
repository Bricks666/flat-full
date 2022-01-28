import { Router } from "express";

import { RentOffersControllers } from "../controllers/index.js";
import { authVerify } from "../middlewares/index.js";

const rentOffersRouter = Router();

rentOffersRouter.put("/new", authVerify, RentOffersControllers.addRentOffer);
rentOffersRouter.post(
	"/:id/accept",
	authVerify,
	RentOffersControllers.acceptRentOffer
);
rentOffersRouter.post(
	"/:id/cancel",
	authVerify,
	RentOffersControllers.cancelRentOffer
);

export { rentOffersRouter };
