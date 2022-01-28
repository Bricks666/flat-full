import { ApiError, RentOffersServices } from "../services/index.js";

export class RentOffersControllers {
	static async addRentOffer(req, res, next) {
		try {
			const { user, rentId, lessee } = req.body;

			if (!user) {
				throw ApiError.UnAuthorization();
			}

			const rentOffer = await RentOffersServices.addRentOffer(
				login,
				org,
				rentId,
				lessee
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

			const rentalOffer = await RentOffersServices.acceptRentalOffer(
				user.login,
				user.org,
				rentalOfferId
			);

			res.json({ rentalOffer });
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

			const rentalOffer = await RentOffersServices.cancelRentOffer(
				user.login,
				user.org,
				rentalOfferId
			);

			res.json({ rentalOffer });
		} catch (e) {
			next(e);
		}
	}
}
