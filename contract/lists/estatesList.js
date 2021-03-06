const { fromBuffer, toBuffer } = require("../utils");

class EstatesList {
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
		const estate = await this.getEstate(estateNum);

		if ((estate && estate.owner !== owner) || !estate) {
			return false;
		}

		return true;
	}
}

module.exports = EstatesList;
