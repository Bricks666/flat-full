const { Context } = require("fabric-contract-api");
const { UsersList, EstatesList } = require("../lists");

class EstatesCTX extends Context {
	constructor() {
		super();
		this.estatesList = new EstatesList(this);
		this.usersList = new UsersList(this);
	}
}

module.exports = EstatesCTX;
