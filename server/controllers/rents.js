import { ApiError } from "../services/ApiError.js";
import { RentsServices } from "../services/rents.js";

export class RentsControllers {
	static async getRents(req, res, next) {
		try {
			const user = req.body.user;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rents = await RentsServices.getRents(user.login, user.org);
			res.json({ rents });
		} catch (e) {
			next(e);
		}
	}

	static async getRentsByOwner(req, res, next) {
		try {
			const user = req.body.user;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rents = await RentsServices.getRentsByOwner(user.login, user.org);
			res.json({ rents });
		} catch (e) {
			next(e);
		}
	}

	static async addRent(req, res, next) {
		try {
			const { user, estateId, price, time } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rent = await RentsServices.addRent(
				user.login,
				user.org,
				estateId,
				price,
				time
			);

			res.json({ rent });
		} catch (e) {
			next(e);
		}
	}
}
