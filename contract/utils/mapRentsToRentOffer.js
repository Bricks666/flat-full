module.exports = (rents, rentOffers) => {
	return rentOffers.map((rentOffer) => {
		const rent = rents[rentOffer.rentId];
		return {
			...rent,
			lessee: rentOffer.lessee,
			isFinish: rentOffer.isFinish,
			id: rentOffer.id,
		};
	});
};
