const { Contract } = require("fabric-contract-api");
const { RentalOfferCTX } = require("../contexts");
const { RentalOffer } = require("../models");

class RentalOffers extends Contract {
	async initializationContract(ctx) {
		await ctx.rentalOffersList.setRentalOffers([]);
	}
	createContext() {
		return new RentalOfferCTX();
	}

	/* lessee is a renter login */
	async addRentalOffer(ctx, rentId, lessee) {
		const user = await ctx.usersList.getUser(lessee);
		const rent = await ctx.rentsList.getRent(rentId);

		if (!rent || !user) {
			return null;
		}

		const price = rent.price;

		if (price > user.balance) {
			return null;
		}
		const rentalOffer = new RentalOffer(rentId, lessee);

		await ctx.rentalOffersList.createRentalOffer(rentalOffer);

		await ctx.usersList.spendMoney(lessee, price);

		return rentalOffer;
	}

	async getRentOffers(ctx) {
		return await ctx.rentalOffersList.getRentalOffers();
	}

	async acceptRentalOffer(ctx, sender, offerId) {
		const offer = await ctx.rentalOffersList.getRentalOffer(offerId);
		const user = await ctx.usersList.getUser(sender);

		if (!user || !offer) {
			return null;
		}

		const rent = await ctx.rentsList.getRent(offer.rentId);
		if (rent.isRent) {
			return null;
		}

		const estate = await ctx.estatesList.getEstate(rent.estateId);

		if (estate.owner !== sender) {
			return null;
		}

		await ctx.usersList.addMoney(sender, offerId);
		await ctx.rentsList.setIsRent(offer.rentId, true);
		await ctx.rentalOffersList.finishRentalOffers(offerId);

		return true;
	}

	async cancelRentalOffer(ctx, sender, offerId) {
		const offer = await ctx.rentalOffersList.getRentalOffer(offerId);
		const user = await ctx.usersList.getUser(sender);

		if (!user || !offer) {
			return null;
		}

		const rent = await ctx.rentsList.getRent(offer.rentId);
		const estate = await ctx.estatesList.getEstate(rent.estateId);

		if (estate.owner !== sender && offer.lessee !== sender) {
			return null;
		}

		const lessee =
			sender === user.login ? user : await ctx.usersList.getUser(offer.lessee);

		await ctx.usersList.addMoney(lessee.login, rent.price);
		await ctx.rentalOffersList.finishRentalOffers(offerId);

		return true;
	}
}

module.exports = RentalOffers;
