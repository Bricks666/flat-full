import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/index.js";
import { PORT } from "./configs/index.js";
import { appRouter } from "./routes/index.js";
import { loginIdentity } from "./services/index.js";

const app = express();

app.use(json());
app.use(cors());
app.use(cookieParser());

app.use("/", appRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
	await loginIdentity("admin", "adminpw", "org1");
});
