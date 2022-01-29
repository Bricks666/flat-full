import { ApiError, RentOffersServices } from "../services/index.js";

export class RentOffersControllers {
	static async addRentOffer(req, res, next) {
		try {
			const { user, rentId } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rentOffer = await RentOffersServices.addRentOffer(
				user.login,
				user.org,
				rentId
			);
			res.json({ rentOffer });
		} catch (e) {
			next(e);
		}
	}

	static async acceptRentOffer(req, res, next) {
		try {
			const { user } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rentalOfferId = req.params.id;

			await RentOffersServices.acceptRentOffer(user.login, user.org, rentalOfferId);

			res.json({ result: 0 });
		} catch (e) {
			next(e);
		}
	}

	static async cancelRentOffer(req, res, next) {
		try {
			const { user } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rentalOfferId = req.params.id;

			await RentOffersServices.cancelRentOffer(
				user.login,
				user.org,
				rentalOfferId
			);

			res.json({ result: 0 });
		} catch (e) {
			next(e);
		}
	}

	static async getRentOffers(req, res, next) {
		try {
			const { user } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}
			const rentOffers = await RentOffersServices.getRentOffers(
				user.login,
				user.org
			);

			res.json({ rentOffers });
		} catch (e) {
			next(e);
		}
	}
}
