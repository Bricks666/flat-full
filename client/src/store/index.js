import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./user";
import { estates } from "./estates";
import { myEstates } from "./myEstates";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user,
	estates,
	myEstates,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export { loginThunk, logoutThunk, registrationThunk, authThunk } from "./user";
export { loadEstatesThunk } from "./estates";
export { loadMyEstatesThunk } from "./myEstates";
