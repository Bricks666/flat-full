import Axios from "axios";

export const instance = Axios.create({
	withCredentials: true,
	baseURL: "http://localhost:5000/",
});

instance.interceptors.response.use(
	(response) => {
		if ("accessToken" in response) {
			instance.defaults.headers.common["Authorization"] = response.accessToken;
		}
		return response;
	},
	(error) => {
		throw error;
	}
);
