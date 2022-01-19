import crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { sign, verify } from "jsonwebtoken";

const PUBLIC_KEY = readFileSync("./config/public_key.pem", "utf8");
const PRIVATE_KEY = readFileSync("./config/private_key.pem", "utf8");

export const generateTokens = (user) => {
	try {
		const accessToken = sign(user, PUBLIC_KEY, {
			algorithm: "RS256",
			expiresIn: "1h",
		});
		const refreshToken = sign(user, PUBLIC_KEY, {
			algorithm: "RS256",
			expiresIn: "14d",
		});
	} catch {
		return null;
	}
};

export const verifyToken = (token) => {
	try {
		const user = verify(token, PRIVATE_KEY);
		return user;
	} catch {
		return null;
	}
};

export const generatePairKeys = () => {
	const keyPair = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});

	writeFileSync("./config/public_key.pem", keyPair.publicKey);
	writeFileSync("./config/private_key.pem", keyPair.privateKey);
};
