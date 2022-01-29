import { getUserLogin } from ".";

export const getRentOffers = (state) => {
	return state.rentOffers.list;
};

export const getSendedRentOffers = (state) => {
	const lessee = getUserLogin(state);
	return getRentOffers(state).filter(
		(rentOffer) => rentOffer.lessee === lessee
	);
};

export const getReceivedRentOffers = (state) => {
	const owner = getUserLogin(state);
	return getRentOffers(state).filter((rentOffer) => rentOffer.owner === owner);
};
