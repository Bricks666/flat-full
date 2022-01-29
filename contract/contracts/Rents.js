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
	async getRents(ctx) {
		return await ctx.rentsList.getRents();
	}
	async getRentsByOwner(ctx, owner) {
		const estates = await ctx.estatesList.getEstates();
		const myEstatesId = estates
			.filter((estate) => estate.owner === owner)
			.map((estate) => estate.id);
		const rentsPromises = myEstatesId.map((id) => ctx.rentsList.getRent(id));

		return await Promise.all(rentsPromises);
	}

	async createRent(ctx, lessor, estateNum, price, time) {
		const isOwner = await ctx.estatesList.isOwner(estateNum, lessor);
		const isNotPosted = await ctx.rentsList.isNotPosted(estateNum);
		if (!isOwner || !isNotPosted) {
			return false;
		}

		const rent = new Rent(estateNum, price, time);

		await ctx.rentsList.addRent(rent);

		return rent;
	}
}

module.exports = Rents;
