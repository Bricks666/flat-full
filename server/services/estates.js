import {
	CHANNEL,
	CHAINCODE,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { createWallet, createGateway, getContract } from "./index.js";
import { fromBuffer } from "../utils/index.js";

export class EstatesServices {
	static async getEstates(login, org) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.ESTATES
		);
		const response = await contract.submitTransaction(
			TRANSACTIONS.ESTATES.GET_MANY
		);
		gateway.disconnect();
		return fromBuffer(response);
	}

	static async addEstate(admin, org, owner, square, lifetime) {
		const wallet = await createWallet(org, admin);
		const gateway = await createGateway(wallet, admin, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.ESTATES
		);
		const response = await contract.submitTransaction(
			TRANSACTIONS.ESTATES.ADD,
			admin,
			owner,
			square,
			lifetime
		);
		gateway.disconnect();
		return fromBuffer(response);
	}
}
