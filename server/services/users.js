import {
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { createGateway, createWallet, getContract } from "./index.js";
import argon from "argon2";
import { createCA, loginIdentity, registerIdentity } from "./fabric.js";
import { ApiError } from "./ApiError.js";

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

		return user.toString();
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

				gateway.disconnect();
			} catch {}
		}
		if (!user) {
			throw ApiError.BadRequest("No registered");
		}
		return user;
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

			await contract.submitTransaction(TRANSACTIONS.USERS.REG, login, "User");

			gateway.disconnect();
		} catch(e) {
			throw ApiError.BadRequest("Already registered");
		}
	}
}
