const { Contract } = require("fabric-contract-api");
const { Estate } = require("../models");
const { EstatesCTX } = require("../contexts");

class Estates extends Contract {
	createContext() {
		return new EstatesCTX();
	}
	async initializationContract(ctx) {
		const estates = [];

		estates.push(new Estate(estates.length, "User2", 60, "19.12.1990"));
		estates.push(new Estate(estates.length, "User2", 230, "19.12.1990"));
		estates.push(new Estate(estates.length, "User1", 70, "19.12.1990"));

		await ctx.estatesList.setEstates(estates);
	}

	/* METHODS */
	async addEstate(ctx, admin, owner, square, lifetime) {
		// admin - логин админа, который добавляет
		const user = await ctx.usersList.getUser(admin);
		const estates = await this.getEstates(ctx);

		if (!user || user.role !== "Admin") {
			throw new Error("Проверьте свою роль");
		}

		const estate = new Estate(estates.length, owner, square, lifetime);

		await ctx.estatesList.addEstate(estate);
		return estate;
	}

	async getEstate(ctx, estateNum) {
		return await ctx.estatesList.getEstate(estateNum);
	}

	async getEstates(ctx) {
		return await ctx.estatesList.getEstates();
	}

	async getMyEstates(ctx, owner) {
		return (await this.getEstates(ctx)).filter(
			(estate) => estate.owner === owner
		);
	}
}

module.exports = Estates;
