const { toBuffer, fromBuffer } = require("../utils");

class RentalOffersList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "rentalOffers";
	}
	/* METHODS */
	async addRentOffer(rentalOffer) {
		const rentalOffers = await this.getRentalOffers();
		rentalOffers.push(rentalOffer);

		await this.setRentalOffers(rentalOffers);
	}

	async getRentalOffers() {
		return fromBuffer(await this.ctx.stub.getState(this.KEY));
	}
	async getRentalOffer(offerId) {
		return (await this.getRentalOffers())[offerId];
	}

	async setRentalOffers(offers) {
		await this.ctx.stub.putState(this.KEY, toBuffer(offers));
	}

	async finishRentalOffers(offerId) {
		const offers = await this.getRentalOffers();

		const newOffers = offers.map((offer) =>
			offer.id === +offerId ? { ...offer, isFinish: true } : offer
		);

		await this.setRentalOffers(newOffers);
	}
}

module.exports = RentalOffersList;
