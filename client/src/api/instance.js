import Axios from "axios";
import { refresh } from ".";

export const instance = Axios.create({
	withCredentials: true,
	baseURL: "http://localhost:5000/",
});

const createToken = (token) => `Bearer ${token}`;

instance.interceptors.response.use(
	(response) => {
		debugger;
		if ("accessToken" in response.data) {
			instance.defaults.headers.common["Authorization"] = createToken(
				response.data.accessToken
			);
		}
		return response;
	},
	async (error) => {
		if (error.response.status === 403 && !error.config._isRetry) {
			const originalRequest = error.config;
			originalRequest._isRetry = true;

			try {
				const tokens = await refresh();
				instance.defaults.headers.common["Authorization"] = createToken(
					tokens.accessToken
				);
			} catch (e) {
				throw e;
			}
		}
		throw error;
	}
);
