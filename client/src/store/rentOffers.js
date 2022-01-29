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

export const SET_RENT_OFFERS = "flat/rentOffers/SET_RENT_OFFERS";
export const ADD_RENT_OFFER = "flat/rentOffer/ADD_RENT_OFFER";
export const START_LOADING = "flat/rentOffers/START_LOADING";
export const END_LOADING = "flat/rentOffers/END_LOADING";

const initialState = {
	isLoading: false,
	list: [],
};

export const rentOffers = (state = initialState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};

export const setRentOffersAC = (retnOffers) => {
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
