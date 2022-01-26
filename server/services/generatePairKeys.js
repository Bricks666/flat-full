import { writeFileSync } from "fs";
import crypto from "crypto";

const generatePairKeys = () => {
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
  console.log(process.cwd())
	writeFileSync("./configs/public_key.pem", keyPair.publicKey);
	writeFileSync("./configs/private_key.pem", keyPair.privateKey);
};

generatePairKeys();
