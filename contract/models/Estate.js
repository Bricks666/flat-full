class Estate {
	constructor(owner, square, builtAt) {
		if (owner === "") {
			throw new Error();
		}

		this.owner = owner;
		this.square = square;
		this.builtAt = builtAt;
	}
}

module.exports = Estate
