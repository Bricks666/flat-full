class Rent {
	constructor(id, estateId, price, time) {
		if (price === "") {
			throw new Error("Цена не указана");
		}
		this.id = id;
		this.estateId = estateId;
		this.price = price;
		this.time = time;
		this.isRent = false;
	}
}

module.exports = Rent;
