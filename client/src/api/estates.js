import { instance } from "./instance";

export const getMyEstates = async () => {
	const estates = await instance.get(`/estates/my`);

	return estates.data;
};

export const getEstates = async () => {
	const estates = await instance.get("/estates");

	return estates.data;
};
