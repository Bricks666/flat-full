const { Contract } = require("fabric-contract-api");
const { UsersCTX } = require("../contexts");
const { User } = require("../models");

class Users extends Contract {
	async initializationContract(ctx) {
		const users = {};

		users["Admin1"] = new User("Admin1", "Admin", 50, "org1");
		users["User1"] = new User("User1", "User", 50, "org1");
		users["User2"] = new User("User2", "User", 50, "org1");
		users["User3"] = new User("User3", "User", 50, "org1");
		users["User4"] = new User("User4", "User", 50, "org1");

		await ctx.usersList.setUsers(users);
	}

	createContext() {
		return new UsersCTX();
	}
	/* METHODS */
	async registration(ctx, login, role, balance) {
		const user = new User(login, role, balance, "org1");

		await ctx.usersList.addUser(user);
		ctx.usersList.newUser(login);
	}
	// Понижение админа до пользователя
	async delAdmin(ctx, login, loginToDel) {
		const usersList = await this.ctx.stub.getState("users");
		const users = JSON.parse(usersList.toString());
		const myInfo = users.get(login);
		const userInfo = users.get(loginToDel);
		if (myInfo.role !== "Admin") {
			throw new Error("Проверьте свою роль");
		}
		if (userInfo.role !== "Admin") {
			throw new Error("Проверьте роль пользователя");
		}
		userInfo.role = "User";
		const dataUser = Buffer.from(JSON.stringify(userInfo));
		users[loginToDel] = dataUser;
		const dataUsers = Buffer.from(JSON.stringify(users));
		await this.ctx.stub.putState("users", dataUsers);
		ctx.usersList.changeRole(loginToDel, "User");
	}
	//повышение пользователя до админа
	async boostToAdmin(ctx, login, loginToBoost) {
		const usersList = await this.ctx.stub.getState("users");
		const users = JSON.parse(usersList.toString());
		const myInfo = users.get(login);
		const userInfo = users.get(loginToBoost);
		if (myInfo.role !== "Admin") {
			throw new Error("Проверьте свою роль");
		}
		if (userInfo.role === "Admin") {
			throw new Error("Проверьте роль пользователя");
		}
		userInfo.role = "Admin";
		const dataUser = Buffer.from(JSON.stringify(userInfo));
		users[loginToBoost] = dataUser;
		const dataUsers = Buffer.from(JSON.stringify(users));
		await this.ctx.stub.putState("users", dataUsers);
		await ctx.usersList.changeRole(loginToBoost, "Admin");
	}
	//вывод информации о пользователе
	async getUser(ctx, login) {
		return await ctx.usersList.getUser(login);
	}
}

module.exports = Users;
