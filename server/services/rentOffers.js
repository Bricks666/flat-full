import {
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	TRANSACTIONS,
} from "../configs/index.js";
import { createWallet, createGateway, getContract } from "./index.js";
import { fromBuffer } from "../utils/index.js";

export class RentOffersServices {
	static async getRentOffers(login, org) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTAL_OFFERS
		);

		const rentalOffer = await contract.submitTransaction(
			TRANSACTIONS.RENTAL_OFFERS.GET_MANY
		);
		gateway.disconnect();
		return fromBuffer(rentalOffer);
	}
	static async addRentOffer(login, org, rentId) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTAL_OFFERS
		);

		const rentalOffer = await contract.submitTransaction(
			TRANSACTIONS.RENTAL_OFFERS.ADD,
			rentId,
			user.login
		);
		gateway.disconnect();
		return fromBuffer(rentalOffer);
	}
	static async acceptRentOffer(login, org, offerId) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTAL_OFFERS
		);

		const response = await contract.submitTransaction(
			TRANSACTIONS.RENTAL_OFFERS.ACCEPT,
			login,
			offerId
		);
		gateway.disconnect();
		return fromBuffer(response);
	}

	static async cancelRentOffer(login, org, offerId) {
		const wallet = await createWallet(org, login);
		const gateway = await createGateway(wallet, login, org);
		const contract = await getContract(
			gateway,
			CHANNEL,
			CHAINCODE,
			CONTRACTS.RENTAL_OFFERS
		);

		const response = await contract.submitTransaction(
			TRANSACTIONS.RENTAL_OFFERS.CANCEL,
			login,
			offerId
		);
		gateway.disconnect();
		return fromBuffer(response);
	}
}
