const { Contract } = require("fabric-contract-api");
const { RentsCTX } = require("../contexts");
const { Rent } = require("../models");
const { mapEstatesToRent } = require("../utils");

class Rents extends Contract {
	createContext() {
		return new RentsCTX();
	}
	async initializationContract(ctx) {
		await ctx.rentsList.setRents([]);
	}

	/* METHODS */
	async getRent(ctx, rentId) {
		return await this.getRents(ctx).find((rent) => rent.id === +rentId);
	}
	async getRents(ctx) {
		const estates = await ctx.estatesList.getEstates();
		const rents = await ctx.rentsList.getRents();
		return mapEstatesToRent(estates, rents);
	}
	async createRent(ctx, lessor, estateNum, price, time) {
		const isOwner = await ctx.estatesList.isOwner(+estateNum, lessor);
		const isNotPosted = await ctx.rentsList.isNotPosted(estateNum);
		if (!isOwner || !isNotPosted) {
			return false;
		}
		const rents = await ctx.rentsList.getRents();
		const rent = new Rent(rents.length, +estateNum, price, time);
    console.debug(rent)
		const estate = await ctx.estatesList.getEstate(+estateNum);
    console.debug(estate)

		await ctx.rentsList.addRent(rent);

		return mapEstatesToRent([estate], [rent])[0];
	}
}

module.exports = Rents;
