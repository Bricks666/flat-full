const { Contract } = require("fabric-contract-api");
const { UsersCTX } = require("../contexts");
const { User } = require("../models");
const { toBuffer } = require("../utils");

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
	}
	// Понижение админа до пользователя
	async delAdmin(ctx, login, loginToDel) {
		const users = await ctx.usersList.getUsers();

		const myInfo = users[login];
		const userInfo = users[loginToDel];

		if (myInfo.role !== "Admin") {
			return new Error("Проверьте свою роль");
		}

		if (userInfo.role !== "Admin") {
			return new Error("Проверьте роль пользователя");
		}

		userInfo.role = "User";

		await ctx.usersList.setUsers(users);
	}
	//повышение пользователя до админа
	async boostToAdmin(ctx, login, loginToBoost) {
		const users = await ctx.usersList.getUsers();

		const myInfo = users[login];
		const userInfo = users[loginToBoost];

		if (myInfo.role !== "Admin") {
			return new Error("Проверьте свою роль");
		}

		if (userInfo.role === "Admin") {
			return new Error("Проверьте роль пользователя");
		}

		userInfo.role = "Admin";

		await this.ctx.usersList.setUsers(users);
	}
	//вывод информации о пользователе
	async getUser(ctx, login) {
		return await ctx.usersList.getUser(login);
	}
}

module.exports = Users;
