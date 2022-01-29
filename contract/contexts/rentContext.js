const { Context } = require("fabric-contract-api");
const { RentsList, EstatesList } = require("../lists");

class RentsCTX extends Context {
	constructor() {
		super();
		this.rentsList = new RentsList(this);
		this.estatesList = new EstatesList(this);
	}
}

module.exports = RentsCTX;
