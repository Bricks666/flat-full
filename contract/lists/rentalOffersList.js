const { toBuffer, fromBuffer } = require("../utils");

class RentalOffersList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "rentalOffers";
	}
	/* METHODS */
	async createRentalOffer(rentalOffer) {
		const rentalOffers = await this.getRentalOffers();
		rentalOffers.push(rentalOffer);

		await this.setRentalOffers(rentalOffers);
	}

	async getRentalOffers() {
		return fromBuffer(await this.ctx.getState(this.KEY));
	}
	async getRentalOffer(offerId) {
		return (await this.getRentalOffers())[offerId];
	}

	async setRentalOffers(offers) {
		await this.ctx.stub.putState(this.KEY, toBuffer(offers));
	}

	async finishRentalOffers(offerId) {
		const offers = await this.getRentalOffers();

		if (offers[offerId]) {
			offers[offerId].isFinish = true;
		}

		await this.setRentalOffers(offers);
	}

	/* EVENTS */
	async newRentalOffer(offerId) {
		const offerIdBuffered = toBuffer({ offerId });
		await this.ctx.setEvent("newRentalOffer", offerIdBuffered);
	}

	async changeRentalOfferStatus(offerId) {
		const offerIdBuffered = toBuffer({ offerId });
		await this.ctx.setEvent("changeRentalOfferStatus", offerIdBuffered);
	}
}

module.exports = RentalOffersList;
