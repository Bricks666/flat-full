const roles = ["Admin", "User"];

class User {
	constructor(login, role, balance, organization) {
		if (!roles.includes(role) && Boolean(role)) {
			throw new Error();
		}

		this.login = login;

		this.role = role || "User";
		this.currentRole = null;
		if (["Admin"].includes(role)) {
			this.currentRole = role;
		}

		this.balance = 50;
		if (balance !== "") {
			this.balance = +balance;
		}

		this.organization = organization;
	}
}
module.exports = User;
