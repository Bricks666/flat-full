import { ApiError } from "../services/index.js";

export const errorHandler = (err, req, res, next) => {
	try {
		if (err instanceof ApiError) {
			return res.status(err.status).json(err);
		}

		return res.status(500).json(err);
	} catch (e) {
		res.status(500).json(e);
	}
};
