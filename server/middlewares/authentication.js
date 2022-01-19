import { COOKIE_NAME } from "../configs/index.js";
import { ApiError } from "../services/ApiError.js";
import { verifyToken } from "../services/tokens.js";

export const authentication = async (req, res, next) => {
	try {
		const refreshToken = req.cookies[COOKIE_NAME];

		if (!refreshToken) {
			throw ApiError.UnAuthorization();
		}

		const user = verifyToken(refreshToken);

		if (!user) {
			throw ApiError.BadRequest("Refresh token isn't valid");
		}

		req.body.user = user;
	} catch (e) {
		next(e);
	}
};
