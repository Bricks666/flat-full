import { ApiError } from "../services/index.js";
import { EstatesServices } from "../services/index.js";

export class EstatesControllers {
	static async getEstate(req, res, next) {
		try {
      console.log(req)
			const { user } = req.body;

      const estateNum = req

			if (!user) {
				throw ApiError.BadRequest("Not user");
			}

			if (!estateNum) {
				throw ApiError.BadRequest("Not estateNum");
			}

			const estate = await EstatesServices.getEstate(
				user.login,
				user.org,
				estateNum
			);

			res.json({ estate });
		} catch (e) {
			next(e);
		}
	}

	static async addEstate(res, req, next) {
		try {
			const { user, owner, square, lifetime } = req.body;

			if (!user) {
				throw ApiError.BadRequest("Not user");
			}
			if (!owner || !square || !lifetime) {
				throw ApiError.BadRequest("Must be owner, square, lifetime");
			}

			const estate = await EstatesServices.addEstate(
				user.login,
				user.org,
				owner,
				square,
				lifetime
			);

			res.json({ estate });
		} catch (e) {
			next(e);
		}
	}
}