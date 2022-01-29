const { fromBuffer, toBuffer } = require("../utils");

class UsersList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "users";
	}
	/* METHODS */
	//внесение нового пользователя в Мap пользователей
	async addUser(user) {
		const usersList = await this.ctx.stub.getState(this.KEY);
		const users = fromBuffer(usersList);

		users[user.login] = user;

		const dataUser = toBuffer(users);
		await this.ctx.stub.putState(this.KEY, dataUser);
	}

	async getUser(login) {
		return (await this.getUsers())[login];
	}

	async getUsers() {
		const users = await this.ctx.stub.getState(this.KEY);
		return fromBuffer(users);
	}

	async setUsers(users) {
		const dataUser = toBuffer(users);
		await this.ctx.stub.putState(this.KEY, dataUser);
	}

	async spendMoney(login, count) {
		const users = await this.getUsers();
		users[login].balance -= count;
		await this.setUsers(users);
	}

	async addMoney(login, count) {
		const users = await this.getUsers();
		users[login].balance += count;
		await this.setUsers(users);
	}

	/* EVENTS */
	//Event на смену ролей
	async changeRole(login, newRole) {
		const data = toBuffer({ login, newRole });
		await this.ctx.stub.setEvent("changeRole", data);
	}

	async newUser(login) {
		const loginData = toBuffer({ login });
		await this.ctx.stub.setEvent("newUser", loginData);
	}

	async changeBalance(login, newBalance) {
		const bufferedData = toBuffer({ login, newBalance });
		await this.ctx.setEvent("changeBalance", bufferedData);
	}
}

module.exports = UsersList;
