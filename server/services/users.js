import {
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { createGateway, createWallet, getContract } from "./index.js";
import { loginIdentity, registerIdentity } from "./fabric.js";
import { ApiError } from "./ApiError.js";
import { fromBuffer } from "../utils/index.js";

export class UsersServices {
	static ORGS = ["org1", "org2"];

	static async auth(org, login) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.USERS
		);
		const user = await contract.submitTransaction(
			TRANSACTIONS.USERS.GET_ONE,
			login
		);

		gateway.disconnect();

		return fromBuffer(user);
	}

	static async login(login, password) {
		let user = null;
		for (const org of this.ORGS) {
			try {
				await loginIdentity(login, password, org);

				const wallet = await createWallet(org, login);
				const gateway = await createGateway(wallet, login, org);
				const contract = await getContract(
					gateway,
					CHANNEL,
					CHAINCODE,
					CONTRACTS.USERS
				);
				user = await contract.submitTransaction(
					TRANSACTIONS.USERS.GET_ONE,
					login
				);

				if (user) {
					break;
				}

				gateway.disconnect();
			} catch {}
		}
		if (!user) {
			throw ApiError.BadRequest("No registered");
		}
		return fromBuffer(user);
	}

	static async registration(login, password, org) {
		try {
			await registerIdentity(login, password, org);
			const wallet = await createWallet(org, login);
			const gateway = await createGateway(wallet, login, org);
			const contract = await getContract(
				gateway,
				CHANNEL,
				CHAINCODE,
				CONTRACTS.USERS
			);

			await contract.submitTransaction(
				TRANSACTIONS.USERS.REG,
				login,
				"Admin",
				150
			);

			gateway.disconnect();
		} catch (e) {
			throw ApiError.BadRequest("Already registered");
		}
	}
}
