import { instance } from "./instance";

export const getMyEstates = async () => {
	const estates = await instance.get(`/estates/my`);

	return estates.data;
};

export const getEstates = async () => {
	const estates = await instance.get("/estates");

	return estates.data;
};

export const addEstate = async (owner, square, builtAt) => {
	const response = await instance.put("/estates/new", {
		owner,
		square,
		builtAt,
	});

	return response.data;
};
