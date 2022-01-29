import { addEstate, getEstates } from "../api";

/*
state: {
  list: []
  isLoadings: boolean
}
estate: {
  owner: string;
  square: number;
  buildAt: string;
}
*/

export const START_LOADING = "flat/estates/START_LOADING";
export const END_LOADING = "flat/estates/END_LOADING";
export const SET_ESTATES = "flat/estates/SET_ESTATES";
export const ADD_ESTATE = "flat/estates/ADD_ESTATE";

const initialState = {
	list: [],
	isLoading: false,
};

export const estates = (state = initialState, action) => {
	switch (action.type) {
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
		case SET_ESTATES: {
			return {
				...state,
				list: action.payload.estates,
			};
		}
		case ADD_ESTATE: {
			return {
				...state,
				list: [...state.list, action.payload.estate],
			};
		}
		default: {
			return state;
		}
	}
};

export const setEstatesAC = (estates) => {
	return {
		type: SET_ESTATES,
		payload: {
			estates,
		},
	};
};

export const addEstateAC = (estate) => {
	return {
		type: ADD_ESTATE,
		payload: {
			estate,
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

export const loadEstatesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());
			const response = await getEstates();

			dispatch(setEstatesAC(response.estates));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};

export const addEstateThunk = (owner, square, builtAt) => {
	return async (dispatch) => {
		try {
			const response = await addEstate(owner, square, builtAt);

			dispatch(addEstateAC(response.estate));
		} catch (e) {
			console.log(e);
		}
	};
};
