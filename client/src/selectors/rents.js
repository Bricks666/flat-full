import { getUserLogin } from ".";

export const getRents = (state) => {
	return state.rents.list;
};

export const getMyRents = (state) => {
	const owner = getUserLogin(state);
	return getRents(state).filter((rent) => rent.owner === owner);
};

export const getLoadingRents = (state) => state.rents.isLoading;
