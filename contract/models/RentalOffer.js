class RentalOffer {
	constructor(id, rentId, lessee) {
		this.id = id;
		this.rentId = rentId;
		this.lessee = lessee;
		this.isFinish = false;
	}
}

module.exports = RentalOffer;
