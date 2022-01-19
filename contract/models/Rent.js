class Rent {
	constructor(estateId, price, time) {
		if (price === "") {
			throw new Error("Цена не указана");
		}
		this.estateId = estateId;
		this.price = price;
		this.time = time;
		this.isRent = false;
	}
}

module.exports = Rent;
