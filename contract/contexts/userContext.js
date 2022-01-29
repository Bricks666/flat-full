const { Context } = require("fabric-contract-api");
const { UsersList } = require("../lists");

class UsersCTX extends Context {
	constructor() {
		super();
		this.usersList = new UsersList(this);
	}
}

module.exports = UsersCTX;
