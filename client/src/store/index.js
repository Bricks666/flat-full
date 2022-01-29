import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./user";
import { estates } from "./estates";
import { rents } from "./rents";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user,
	estates,
	rents,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export { loginThunk, logoutThunk, registrationThunk, authThunk } from "./user";
export { loadEstatesThunk, addEstateThunk } from "./estates";
export { loadRentsThunk, addRentThunk } from "./rents";
