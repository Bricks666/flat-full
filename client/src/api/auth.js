import { instance } from "./instance";

export const login = async (login, password) => {
	const user = await instance.post("/auth/login", { password, login });
	return user.data;
};

export const logout = async () => {
	const response = await instance.delete("/auth/logout");

	return response.data;
};

export const auth = async () => {
	const user = await instance.get("/auth");

	return user.data;
};

export const registration = async (login, password) => {
	const response = await instance.put("/auth/registration", {
		login,
		password,
	});

	return response.data;
};

export const refresh = async () => {
	const tokens = await instance.get("/auth/refresh");

	return tokens.data;
};
