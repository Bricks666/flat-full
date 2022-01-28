import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/index.js";
import {
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	PORT,
	TRANSACTIONS,
} from "./configs/index.js";
import { appRouter } from "./routes/index.js";
import {
	loginIdentity,
	createWallet,
	createGateway,
	getContract,
} from "./services/index.js";

const app = express();

app.use(json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/", appRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
	await loginIdentity("admin", "adminpw", "org1");
	const wallet = await createWallet("org1", "admin");
	const gateway = await createGateway(wallet, "admin", "org1");
	const users = await getContract(gateway, CHANNEL, CHAINCODE, CONTRACTS.USERS);
	await users.submitTransaction(TRANSACTIONS.USERS.INIT);
	const rents = await getContract(gateway, CHANNEL, CHAINCODE, CONTRACTS.RENTS);
	await rents.submitTransaction(TRANSACTIONS.RENTS.INIT);
	const estates = await getContract(
		gateway,
		CHANNEL,
		CHAINCODE,
		CONTRACTS.ESTATES
	);
	await estates.submitTransaction(TRANSACTIONS.ESTATES.INIT);
	const offers = await getContract(
		gateway,
		CHANNEL,
		CHAINCODE,
		CONTRACTS.RENTAL_OFFERS
	);
	await offers.submitTransaction(TRANSACTIONS.RENTAL_OFFERS.INIT);
	console.log("OK");
});
