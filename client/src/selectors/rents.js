import { getMyEstatesIds } from ".";

export const getRents = (state) => {
	return state.rents.list;
};

export const getMyRents = (state) => {
	debugger;
	const estateIds = getMyEstatesIds(state);
	return getRents(state).filter((rent) => estateIds.includes(+rent.estateId));
};

export const getLoadingRents = (state) => state.rents.isLoading;
