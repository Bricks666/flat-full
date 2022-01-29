const { fromBuffer, toBuffer } = require("../utils");

class RentsList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "rents";
	}

	/* METHODS */
	async addRent(rent) {
		const rents = await this.getRents();

		rents.push(rent);

		await this.setRents(rents);
	}

	async setRents(rents) {
		await this.ctx.stub.putState(this.KEY, toBuffer(rents));
	}

	async getRent(rentId) {
		const rents = await this.getRents();
		console.debug(rents);
		return rents.find((rent) => rent.id === rentId);
	}
	async getRentByEstateNumber(estateNumber) {
		const rents = await this.getRents();
		return rents.find((rent) => rent.estateId === estateNumber);
	}

	async getRents() {
		return fromBuffer(await this.ctx.stub.getState(this.KEY));
	}

	async isNotPosted(estateNumber) {
		return !(await this.getRentByEstateNumber(estateNumber));
	}

	async isOwner(rentId, owner) {
		const rent = await this.getRent(rentId);
		return !!rent && rent.owner === owner;
	}

	async setIsRent(rentId, isRent) {
		const rents = await this.getRents();

		const mappedRents = rents.map((rent) =>
			rent.id === rentId ? { ...rent, isRent } : rent
		);

		await this.setRents(mappedRents);
	}
}

module.exports = RentsList;
