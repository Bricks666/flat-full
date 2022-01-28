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
		GET_ONE: "getRent",
		ADD: "createRent",
		INIT: "initializationContract",
	},
	ESTATES: {
		ADD: "addEstate",
		GET_ONE: "getEstate",
		INIT: "initializationContract",
	},
	RENTAL_OFFERS: {
		ADD: "addRentalOffer",
		ACCEPT: "acceptRentalOffer",
		CANCEL: "cancelRentalOffer",
		INIT: "initializationContract",
	},
};
