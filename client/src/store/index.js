import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./user";
import { estates } from "./estates";
import { myEstates } from "./myEstates";
import { rents } from "./rents";
import { myRents } from "./myRents";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user,
	estates,
	myEstates,
	rents,
	myRents,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export { loginThunk, logoutThunk, registrationThunk, authThunk } from "./user";
export { loadEstatesThunk, addEstateThunk } from "./estates";
export { loadMyEstatesThunk } from "./myEstates";
export { loadRentsThunk, addRentThunk } from "./rents";
export { loadMyRentsThunk } from "./myRents";
