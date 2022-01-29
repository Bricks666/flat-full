import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./user";
import { estates } from "./estates";
import { rents } from "./rents";
import { rentOffers } from "./rentOffers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user,
	estates,
	rents,
	rentOffers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export {
	loginThunk,
	logoutThunk,
	registrationThunk,
	authThunk,
	changeBalanceAC,
} from "./user";
export { loadEstatesThunk, addEstateThunk } from "./estates";
export { loadRentsThunk, addRentThunk } from "./rents";
export {
	loadRentOffersThunk,
	addRentOfferThunk,
	acceptRentOfferThunk,
	cancelRentOfferThunk,
} from "./rentOffers";
