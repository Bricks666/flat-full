export const getUserInfo = (state) => {
	return state.user.info;
};

export const getLoadingUser = (state) => {
	return state.user.isLoading;
};

export const getUserLogin = (state) => {
	return getUserInfo(state).login;
};
