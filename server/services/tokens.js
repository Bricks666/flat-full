import crypto from "crypto";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

const PUBLIC_KEY = readFileSync("./configs/public_key.pem", "utf8");
const PRIVATE_KEY = readFileSync("./configs/private_key.pem", "utf8");

export class TokensServices {
	static generateTokens = (user) => {
		try {
			const accessToken = jwt.sign(user, PRIVATE_KEY, {
				algorithm: "RS256",
				expiresIn: "1h",
			});
			const refreshToken = jwt.sign(user, PRIVATE_KEY, {
				algorithm: "RS256",
				expiresIn: "14d",
			});

      return {
        accessToken,
        refreshToken
      }
		} catch (e) {
			return null;
		}
	};

	static verifyToken = (token) => {
		try {
			const user = jwt.verify(token, PUBLIC_KEY);
			return user;
		} catch {
			return null;
		}
	};

}
