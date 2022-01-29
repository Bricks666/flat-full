import { ApiError } from "../services/index.js";
import { EstatesServices } from "../services/index.js";

export class EstatesControllers {
	static async getEstates(req, res, next) {
		try {
			console.log(req);

			const estates = await EstatesServices.getEstates("admin", "org1");

			res.json({ estates });
		} catch (e) {
			next(e);
		}
	}

	static async addEstate(req, res, next) {
		try {
			const { user, owner, square, builtAt } = req.body;

			if (!user) {
				throw ApiError.BadRequest("Not user");
			}
			if (!owner || !square || !builtAt) {
				throw ApiError.BadRequest("Must be owner, square, builtAt");
			}

			const estate = await EstatesServices.addEstate(
				user.login,
				user.org,
				owner,
				square,
				builtAt
			);

			res.json({ estate });
		} catch (e) {
			next(e);
		}
	}
}
