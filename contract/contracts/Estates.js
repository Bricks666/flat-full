const { Contract } = require("fabric-contract-api");
const { Estate } = require("../models");
const { EstatesCTX } = require("../contexts");

class Estates extends Contract {
	createContext() {
		return new EstatesCTX();
	}
	async initializationContract(ctx) {
		const estates = [];

		estates.push(new Estate("User2", 60, "19.12.1990"));
		estates.push(new Estate("User2", 230, "19.12.1990"));
		estates.push(new Estate("User1", 70, "19.12.1990"));

		await ctx.estateList.setEstates(estates);
	}

	/* METHODS */
	async addEstate(ctx, admin, owner, square, lifetime) {
		// admin - логин админа, который добавляет
		const user = await ctx.usersList.getUser(admin);

		if (!user || user.role !== "Admin") {
			throw new Error("Проверьте свою роль");
		}

		const estate = new Estate(owner, square, lifetime);

		await ctx.estatesList.addEstate(estate);
	}

	async getEstate(ctx, estateNum) {
		return await ctx.estatesList.getEstate(estateNum);
	}
}

module.exports = Estates;
