const { Context } = require("fabric-contract-api");
const { RentalOffer } = require("../models");
const { toBuffer, fromBuffer } = require("../utils");

class RentalOffersList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "rentalOffers";
	}
	/* METHODS */
	async createRentalOffer(rentId, lessee) {
		const rentalOffer = new RentalOffer(rentId, lessee);

		const rentalOffers = await this.getRentalOffers();
		rentalOffers.push(rentalOffer);

		await this.setRentalOffers(rentalOffers);

		this.newRentalOffer(rentalOffers.length - 1);
	}

	async getRentalOffers() {
		return fromBuffer(await this.ctx.getState(this.KEY));
	}
	async getRentalOffer(offerId) {
		return (await this.getRentalOffers())[offerId];
	}

	async setRentalOffers(offers) {
		await this.ctx.putState(this.KEY, toBuffer(offers));
	}

	async finishRentalOffers(offerId) {
		const offers = await this.getRentalOffers();

		if (offers[offerId]) {
			offers[offerId].isFinish = true;
		}

		await this.setRentalOffers(offers);

		this.changeRentalOfferStatus(offerId);
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

class RentalOfferCTX extends Context {
	constructor() {
		super();
		this.rentalOffersList = new RentalOffersList(this);
	}
}

module.exports = RentalOfferCTX;
