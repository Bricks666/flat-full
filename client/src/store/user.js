import { auth, login as loginAPI, logout, registration } from "../api";
/*
state: {
  isLogin: boolean;
  info: {
    login: string;
    role: string;
    currentRole: string;
    balance: number;
    organization: string;
  }
  isLoading: boolean;
}
*/

export const SET_USER_INFO = "flat/user/SET_USER_INFO";
export const LOGIN = "flat/user/LOGIN";
export const LOGOUT = "flat/user/LOGOUT";
export const START_LOADING = "flat/user/START_LOADING";
export const END_LOADING = "flat/user/END_LOADING";

const initialState = {
	isLogin: false,
	isLoading: true,
	user: {
		login: "",
		role: "",
		currentRole: "",
		balance: 0,
		organization: "",
	},
};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_INFO: {
			return {
				...state,
				info: action.payload.user,
			};
		}
		case LOGIN: {
			return {
				...state,
				isLogin: true,
			};
		}
		case LOGOUT: {
			return {
				...state,
				isLogin: false,
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

export const setUserInfoAC = (user) => {
	console.log(user);
	return {
		type: SET_USER_INFO,
		payload: {
			user,
		},
	};
};

export const loginAC = () => {
	return {
		type: LOGIN,
	};
};

export const logoutAC = () => {
	return {
		type: LOGOUT,
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

export const authThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(startLoadingAC());

			const userAndTokens = await auth();

			dispatch(setUserInfoAC(userAndTokens.user));
			dispatch(loginAC());
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(endLoadingAC());
		}
	};
};

export const loginThunk = (login, password) => {
	return async (dispatch) => {
		try {
			const userAndTokens = await loginAPI(login, password);
			dispatch(setUserInfoAC(userAndTokens.user));
			dispatch(loginAC());
			return true;
		} catch (e) {
			console.log(e);
		}
	};
};

export const logoutThunk = () => {
	return async (dispatch) => {
		try {
			const response = await logout();

			if (response.result === 0) {
				dispatch(logoutAC());
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export const registrationThunk = (login, password) => {
	return async () => {
		try {
			await registration(login, password);
			return true;
		} catch (e) {
			console.log(e);
		}
	};
};
