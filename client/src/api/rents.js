import { instance } from "./instance";

export const getRents = async () => {
	const response = await instance.get("/rents/");

	return response.data;
};

export const addRent = async (estateId, price, time) => {
	const response = await instance.put("/rents/new", { estateId, price, time });

	return response.data;
};

export const getMyRents = async () => {
	const response = await instance.get("/rents/my");

	return response.data;
};
