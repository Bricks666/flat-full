export const getEstates = (state) => {
	return state.estates.list;
};

export const getMyEstates = (state) => {
	const owner = state.user.info.login;
	return state.estates.list.filter((estate) => estate.owner === owner);
};

export const getLoadingEstate = (state) => state.estates.isLoading;
