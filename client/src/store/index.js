import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./user";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export { loginThunk, logoutThunk, registrationThunk, authThunk } from "./user";
