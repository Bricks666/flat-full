const { Users, Rents, Estates, RentalOffers } = require("./contracts");

module.exports.Users = Users;
module.exports.Rents = Rents;
module.exports.Estates = Estates;
module.exports.RentalOffers = RentalOffers;

module.exports.contracts = [Users, Rents, Estates, RentalOffers];
