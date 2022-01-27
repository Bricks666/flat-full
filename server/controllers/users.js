import { ApiError, TokensServices, UsersServices } from "../services/index.js";
import { COOKIE_NAME } from "../configs/index.js";

export class UserControllers {
	static auth = async (req, res, next) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];

			if (!refreshToken) {
				throw ApiError.UnAuthorization();
			}

			const { org, login } = TokensServices.verifyToken(refreshToken);

			if (!org || !login) {
				throw ApiError.UnAuthorization();
			}

			const user = await UsersServices.auth(org, login);
			const tokens = TokensServices.generateTokens({
				login,
				org,
				role: user.role,
			});
			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 30 * 24 * 60 * 60,
			});
			res.json({ user, ...tokens });
		} catch (e) {
			next(e);
		}
	};

	static login = async (req, res, next) => {
		try {
			const { login, password } = req.body;

			if (!login || !password) {
				throw ApiError.BadRequest("Login and password must be provided");
			}

			const user = await UsersServices.login(login, password);

			const tokens = TokensServices.generateTokens({
				login,
				org,
				role: user.role,
			});
			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 30 * 24 * 60 * 60,
			});
			res.json({ user, ...tokens });
		} catch (e) {
			next(e);
		}
	};

	static registration = async (req, res, next) => {
		try {
			const { login, password, org = "org1" } = req.body;

			if (!login || !password) {
				throw ApiError.BadRequest("Login and password must be provided");
			}

			await UsersServices.registration(login, password, org);

			res.json({ result: 0 });
		} catch (e) {
			next(e);
		}
	};

	static logout = async (req, res, next) => {
		try {
			res.clearCookie(COOKIE_NAME);
			res.json({ result: 0 });
		} catch (e) {
			next(e);
		}
	};

	static refresh = async (req, res, next) => {
		try {
			const refreshToken = req.cookies[COOKIE_NAME];

			if (!refreshToken) {
				throw ApiError.UnAuthorization();
			}

			const user = TokensServices.verifyToken(refreshToken);

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const tokens = TokensServices.generateTokens(user);
			res.cookie(COOKIE_NAME, tokens.refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 30 * 24 * 60 * 60,
			});
			res.json({ ...tokens });
		} catch (e) {
			next(e);
		}
	};
}
