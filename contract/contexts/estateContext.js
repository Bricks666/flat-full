const { Context } = require("fabric-contract-api");
const { fromBuffer, toBuffer } = require("../utils");

class EstateList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "estates";
	}
	/* METHODS */
	async addEstate(estate) {
		const estatesList = await this.ctx.stub.getState(this.KEY);

		const estates = fromBuffer(estatesList);

		estates.push(estate);

		const dataEstate = toBuffer(estates);

		await this.ctx.stub.putState(this.KEY, dataEstate);
	}

	async getEstate(estateNum) {
		return (await this.getEstates())[estateNum];
	}

	async setEstates(estates) {
		const bufferedEstates = toBuffer(estates);
		await this.ctx.stub.putState(this.KEY, bufferedEstates);
	}

	async getEstates() {
		return fromBuffer(await this.ctx.stub.getState(this.KEY));
	}

	async isOwner(estateNum, owner) {
		const estate = await ctx.estatesList.getEstate(estateNum);

		if (estate && estate.owner !== owner || !estate) {
			return false;
		}

		return true;
	}

	/* EVENTS */
	async buyEstate(login, estateNum) {
		const data = toBuffer({ login, estateNum });
		await this.ctx.stub.setEvent("buyEstate", data);
	}
	async newEstate(login, estateNum) {
		const estateData = toBuffer({ login, estateNum });
		await this.ctx.stub.setEvent("newEstate", estateData);
	}
}

class EstatesCTX extends Context {
	constructor() {
		super();
		this.estatesList = new EstateList(this);
	}
}

module.exports = EstatesCTX;
