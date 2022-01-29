/*
state: {
  isLoading: boolean
  list: rentOffer[]
}
rentOffer {
  rentIf: number;
  lessee: string;
  isFinish: boolean
}
*/

import {
	acceptRentOffer,
	addRentOffer,
	cancelRentOffer,
	getRentOffers,
} from "../api";
import { changeBalanceAC } from ".";

export const SET_RENT_OFFERS = "flat/rentOffers/SET_RENT_OFFERS";
export const ADD_RENT_OFFER = "flat/rentOffer/ADD_RENT_OFFER";
export const CHANGE_STATUS_RENT_OFFER =
	"flat/rentOffer/CHANGE_STATUS_RENT_OFFER";
export const START_LOADING = "flat/rentOffers/START_LOADING";
export const END_LOADING = "flat/rentOffers/END_LOADING";

const initialState = {
	isLoading: false,
	list: [],
};

export const rentOffers = (state = initialState, action) => {
	switch (action.type) {
		case SET_RENT_OFFERS: {
			return {
				...state,
				list: action.payload.rentOffers,
			};
		}
		case ADD_RENT_OFFER: {
			return {
				...state,
				list: [...state.list, action.payload.rentOffer],
			};
		}
		case CHANGE_STATUS_RENT_OFFER: {
			return {
				...state,
				list: state.list.map((rentOffer) =>
					rentOffer.id === +action.payload.rentOfferId
						? { ...rentOffer, isFinish: true }
						: rentOffer
				),
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

export const setRentOffersAC = (rentOffers) => {
	return {
		type: SET_RENT_OFFERS,
		payload: {
			rentOffers,
		},
	};
};

export const addRentOfferAC = (rentOffer) => {
	return {
		type: ADD_RENT_OFFER,
		payload: {
			rentOffer,
		},
	};
};
export const changeStatusAC = (rentOfferId) => {
	return {
		type: CHANGE_STATUS_RENT_OFFER,
		payload: {
			rentOfferId,
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

export const loadRentOffersThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());

			const response = await getRentOffers();

			dispatch(setRentOffersAC(response.rentOffers));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};

export const addRentOfferThunk = (rentId) => {
	return async (dispatch) => {
		try {
			const response = await addRentOffer(rentId);

			dispatch(addRentOfferAC(response.rentOffer));
			dispatch(changeBalanceAC(-response.rentOffer.price));
		} catch (e) {
			console.log(e);
		}
	};
};

export const acceptRentOfferThunk = (rentOfferId) => {
	return async (dispatch) => {
		try {
			await acceptRentOffer(rentOfferId);
			dispatch(changeStatusAC(rentOfferId));
		} catch (e) {
			console.log(e);
		}
	};
};

export const cancelRentOfferThunk = (rentOfferId) => {
	return async (dispatch) => {
		try {
			await cancelRentOffer(rentOfferId);
			dispatch(changeStatusAC(rentOfferId));
		} catch (e) {
			console.log(e);
		}
	};
};
