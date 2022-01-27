import { ApiError, TokensServices } from "../services/index.js";

export const authVerify = (req, res, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];

		if (!accessToken) {
			throw ApiError.NotAccess();
		}

		const user = TokensServices.verifyToken(accessToken);

		if (!user) {
			throw ApiError.NotAccess();
		}

		req.body.user = user;

		next();
	} catch (e) {
		next(e);
	}
};
