import {
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { ApiError } from "./ApiError.js";
import { createWallet, createGateway, getContract } from "./index.js";
import { fromBuffer } from "../utils/index.js";

export class RentsServices {
	static async getRents(login, org) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTS
		);

		const rent = await contract.submitTransaction(TRANSACTIONS.RENTS.GET_MANY);
		gateway.disconnect();
		return fromBuffer(rent);
	}

	static async getRentsByOwner(login, org) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTS
		);

		const rents = await contract.submitTransaction(
			TRANSACTIONS.RENTS.GET_BY_OWNER,
			login
		);
		gateway.disconnect();
		return fromBuffer(rents);
	}

	static async addRent(login, org, estateNum, price, time) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTS
		);

		const bufferedRent = await contract.submitTransaction(
			TRANSACTIONS.RENTS.ADD,
			login,
			estateNum,
			price,
			time
		);

		gateway.disconnect();
		const rent = fromBuffer(bufferedRent);

		if (rent === false) {
			throw ApiError.BadRequest("This estate already posted");
		}
		return rent;
	}
}
