export const PORT = 5000;
export const COOKIE_NAME = "rcn35545";
export const CHANNEL = "mychannel";
export const CHAINCODE = "flats";
export const CONTRACTS = {
	USERS: "Users",
	RENTS: "Rents",
	ESTATES: "Estates",
	RENTAL_OFFERS: "RentalOffers",
};
export const TRANSACTIONS = {
	USERS: {
		REG: "registration",
		DEL_ADM: "delAdmin",
		TO_ADMIN: "boostToAdmin",
		GET_ONE: "getUser",
		INIT: "initializationContract",
	},
	RENTS: {
		GET_MANY: "getRents",
		ADD: "createRent",
		INIT: "initializationContract",
	},
	ESTATES: {
		ADD: "addEstate",
		GET_MANY: "getEstates",
		INIT: "initializationContract",
	},
	RENTAL_OFFERS: {
    GET_MANY: "getRentOffers",
		ADD: "addRentalOffer",
		ACCEPT: "acceptRentalOffer",
		CANCEL: "cancelRentalOffer",
		INIT: "initializationContract",
	},
};
