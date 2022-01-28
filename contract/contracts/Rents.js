const { Contract } = require("fabric-contract-api");
const { RentsCTX } = require("../contexts");
const { Rent } = require("../models");

class Rents extends Contract {
	createContext() {
		return new RentsCTX();
	}
	async initializationContract(ctx) {
		await ctx.rentsList.setRents([]);
	}

	/* METHODS */
	async getRent(ctx, rentNum) {
		return await ctx.rentsList.getRent(rentNum);
	}

	async createRent(ctx, lessor, estateNum, price, time) {
		const isOwner = await ctx.estatesList.isOwner(estateNum, lessor);
		const isNotPosted = await ctx.rentLists.isNotPosted(estateNum);
		if (!isOwner || !isNotPosted) {
			return false;
		}

		const rent = new Rent(estateNum, price, time);

		await ctx.rentsList.addRent(rent);

		return rent;
	}
}

module.exports = Rents;
