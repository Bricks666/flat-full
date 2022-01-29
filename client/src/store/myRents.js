/*
state: {
  isLoading: boolean;
  list: rent[]
}
*/

import { getMyRents } from "../api";

export const SET_MY_RENTS = "flat/myRents/SET_MY_RENTS";
export const ADD_MY_RENTS = "flat/myRents/ADD_MY_RENT";
export const START_LOADING = "flat/myRents/START_LOADING";
export const END_LOADING = "flat/myRents/END_LOADING";

const initialState = {
	list: [],
	isLoading: false,
};

export const myRents = (state = initialState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

export const setMyRentsAC = (myRents) => {
	return {
		type: SET_MY_RENTS,
		payload: {
			myRents,
		},
	};
};

export const addMyRentAC = (myRent) => {
	return {
		type: ADD_MY_RENTS,
		payload: {
			myRent,
		},
	};
};

export const startLoadingAC = () => {
	return {
		type: START_LOADING,
	};
};

export const endLoadingAC = () => {
	return {
		type: END_LOADING,
	};
};

export const loadMyRentsThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());
			const response = await getMyRents();

			dispatch(setMyRentsAC(response.rents));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};
