import { ApiError } from "../services/index.js";

export const accessVerify = (req, res, next) => {
	try {
		const user = req.body.user;

		if (!user) {
			throw ApiError.BadRequest("Not user");
		}

		if (user.role !== "Admin") {
			throw ApiError.NotAccess();
		}

    next()
	} catch (e) {
		next(e);
	}
};
