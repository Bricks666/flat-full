import { ApiError } from "../services/ApiError.js";
import { RentsServices } from "../services/rents.js";

export class RentsControllers {
	static async getRent(req, res, next) {
		try {
			const user = req.body.user;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const id = req.params.id;

			const rent = await RentsServices.getRent(user.login, user.org, id);
			res.json({ rent });
		} catch (e) {
			next(e);
		}
	}

	static async addRent(req, res, next) {
		try {
			const { user, estateNum, price, time } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rent = await RentsServices.addRent(
				user.login,
				user.org,
				estateNum,
				price,
				time
			);

			res.json({ rent });
		} catch (e) {
			next(e);
		}
	}
}
