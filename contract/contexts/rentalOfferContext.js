const { Context } = require("fabric-contract-api");
const {
	RentalOffersList,
	UsersList,
	RentsList,
	EstatesList,
} = require("../lists");

class RentalOfferCTX extends Context {
	constructor() {
		super();
		this.rentalOffersList = new RentalOffersList(this);
		this.usersList = new UsersList(this);
		this.rentsList = new RentsList(this);
		this.estatesList = new EstatesList(this);
	}
}

module.exports = RentalOfferCTX;
