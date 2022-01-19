const { Context } = require("fabric-contract-api");
const { fromBuffer, toBuffer } = require("../utils");

class RentsList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "rents";
	}

	/* METHODS */
	async addRent(rent) {
		const rentsList = await this.ctx.stub.getState(this.KEY);

		const rents = fromBuffer(rentsList);

		rents.push(rent);

		const dataRent = toBuffer(rents);

		await this.ctx.stub.putState(this.KEY, dataRent);
	}

	async setRents(rents) {
		const dataRent = toBuffer(rents);

		await this.ctx.stub.putState(this.KEY, dataRent);
	}

	async getRent(rentId) {
		const rentsList = await this.ctx.stub.getState(this.KEY);

		const rents = fromBuffer(rentsList);
		return rents[rentId];
	}
	async getRentByEstateNumber(estateNumber) {
		const rents = this.getRents();
		return rents.find((rent) => rent.estateId === estateNumber);
	}

	async getRents() {
		return fromBuffer(await this.ctx.getState(this.KEY));
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
		if (rents[rentId]) {
			rents[rentId].isRent = isRent;
		}

		await this.setRents(rents);
	}

	/* EVENTS */
	async delRent(login, rentId) {
		const dataRent = toBuffer({ login, rentId });
		await this.ctx.stub.setEvent("delRent", dataRent);
	}

	async rentEstate(login, rentId) {
		const data = toBuffer({ login, rentId });
		await this.ctx.stub.setEvent("rentEstate", data);
	}
	async newRent(login, rentId) {
		const rentData = toBuffer({ login, rentId });
		await this.ctx.stub.setEvent("newRent", rentData);
	}
}

class RentsCTX extends Context {
	constructor() {
		super();
		this.rentsList = new RentsList(this);
	}
}

module.exports = RentsCTX;
