import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { estatesRouter } from "./estatesRouter.js";
import { rentOffersRouter } from "./rentOffersRouter.js";
import { rentsRouter } from "./rentsRouter.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/estates", estatesRouter);
appRouter.use("/rents", rentsRouter);
appRouter.use("/rent-offers", rentOffersRouter);

export { appRouter };
