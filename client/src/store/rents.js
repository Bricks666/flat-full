import { addRent, getRents } from "../api";

/*
state: {
  list: rent[]
  isLoading: boolean;
}

rent: {
  estateId: number;
  price: number;
  time: string;
  isRent: boolean
}
*/

export const SET_RENTS = "flat/rents/SET_RENTS";
export const ADD_RENT = "flat/rents/ADD_RENT";
export const START_LOADING = "flat/rents/START_LOADING";
export const END_LOADING = "flat/rents/END_LOADING";

const initialState = {
	list: [],
	isLoading: false,
};

export const rents = (state = initialState, action) => {
	switch (action.type) {
		case SET_RENTS: {
			return {
				...state,
				list: action.payload.rents,
			};
		}
		case ADD_RENT: {
			return {
				...state,
				list: [...state.list, action.payload.rent],
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

export const setRentsAC = (rents) => {
	return {
		type: SET_RENTS,
		payload: {
			rents,
		},
	};
};

export const addRentAC = (rent) => {
	return {
		type: ADD_RENT,
		payload: {
			rent,
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

export const loadRentsThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());

			const response = await getRents();

			dispatch(setRentsAC(response.rents));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};

export const addRentThunk = (estateId, price, time) => {
	return async (dispatch) => {
		try {
			const response = await addRent(estateId, price, time);

			dispatch(addRentAC(response.rent));
		} catch (e) {
			console.log(e);
		}
	};
};
