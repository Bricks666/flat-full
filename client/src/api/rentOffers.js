import { instance } from "./instance";

export const getRentOffers = async () => {
	const response = await instance.get("/rent-offers");

	return response.data;
};

export const addRentOffer = async (rentId) => {
	const response = await instance.put("/rent-offers/new", { rentId });

	return response.data;
};

export const acceptRentOffer = async (rentOfferId) => {
	const response = await instance.post(`/rent-offers/${rentOfferId}/accept`);

	return response.data;
};

export const cancelRentOffer = async (rentOfferId) => {
	const response = await instance.post(`/rent-offers/${rentOfferId}/cancel`);

	return response.data;
};
