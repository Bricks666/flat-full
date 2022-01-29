import { getEstates } from "../api";

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
