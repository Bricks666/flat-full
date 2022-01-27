import {
	CHANNEL,
	CHAINCODE,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { createWallet, createGateway, getContract } from "./index.js";

export class EstatesServices {
	static async getEstate(login, org, estateNum) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.ESTATES
		);
		const response = await contract.submitTransaction(
			TRANSACTIONS.ESTATES.GET_ONE,
			estateNum
		);
		gateway.disconnect();
		return response.toString();
	}

	static async addEstate(admin, org, owner, square, lifetime) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
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
		return response.toString();
	}
}