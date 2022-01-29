class Estate {
	constructor(id, owner, square, builtAt) {
		if (owner === "") {
			throw new Error();
		}
		this.id = id;
		this.owner = owner;
		this.square = square;
		this.builtAt = builtAt;
	}
}

module.exports = Estate;
