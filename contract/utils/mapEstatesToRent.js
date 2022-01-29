module.exports = (estates, rents) => {
	return rents.map((rent) => {
		const estate = estates.find((estate) => estate.id === rent.estateId);
		return {
			id: rent.id,
			estateId: estate.id,
			owner: estate.owner,
			square: estate.square,
			builtAt: estate.builtAt,
			price: rent.price,
			time: rent.time,
			isRent: rent.isRent,
		};
	});
};
