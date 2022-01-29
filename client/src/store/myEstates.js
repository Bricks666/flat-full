/*
state : {
  isLoading: boolean;
  list: estate[]
}
*/

import { getMyEstates } from "../api";

export const START_LOADING = "flat/myEstates/START_LOADING";
export const END_LOADING = "flat/myEstates/END_LOADING";
export const SET_MY_ESTATES = "flat/myEstates/SET_MY_ESTATES";

const initialState = {
	list: [],
	isLoading: false,
};

export const myEstates = (state = initialState, action) => {
	switch (action.type) {
		case SET_MY_ESTATES: {
			return {
				...state,
				list: action.payload.myEstates,
			};
		}
		case START_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}
		case END_LOADING: {
			return {
				...state,
				isLoading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export const setMyEstatesAC = (myEstates) => {
	return {
		type: SET_MY_ESTATES,
		payload: {
			myEstates,
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

export const loadMyEstatesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());
			const response = await getMyEstates();
      debugger;
			dispatch(setMyEstatesAC(response.estates));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};
