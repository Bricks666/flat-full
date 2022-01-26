import FabricCAServices from "fabric-ca-client";
import { Gateway, Wallets } from "fabric-network";
import { ApiError } from "./index.js";
import { readFileSync } from "fs";

export const getConnectionProfile = (org) => {
	return JSON.parse(readFileSync(`./gateway/connection-${org}.json`));
};

export const createCA = (org) => {
	const connectionProfile = getConnectionProfile(org);

	const ca = connectionProfile.certificateAuthorities[`ca.${org}.example.com`];
	const rootCA = ca.tlsCACerts.pem;

	return new FabricCAServices(
		ca.url,
		{
			trustedRoots: rootCA,
			verify: false,
		},
		ca.name
	);
};

export const createWallet = async (org, login) => {
	return await Wallets.newFileSystemWallet(`./wallet/${org}-${login}`);
};

export const createGateway = async (wallet, login, org) => {
	const gateway = new Gateway();
	const connectionProfile = getConnectionProfile(org);
	await gateway.connect(connectionProfile, {
		identity: login,
		discovery: {
			asLocalhost: true,
			enabled: true,
		},
		wallet,
	});

	return gateway;
};

export const getAdmin = async (org, enrollment) => {
	const wallet = await createWallet(org, "admin");
	return await wallet.get(wallet);
};

export const createIdentity = (org, enrollment) => {
	const msp = `${org[0]}${org.slice(1)}MSP`;
	return {
		credentials: {
			certificate: enrollment.certificate,
			privateKey: enrollment.key.toBytes(),
		},
		mspId: msp,
		type: "X.509",
	};
};

export const getAdminIdentity = async (org) => {
	const wallet = await createWallet(org, "admin");

	const adminIdentity = await wallet.get("admin");
	if (!adminIdentity) {
		throw ApiError.BadRequest("This organization is not supported");
	}
	const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
	const admin = await provider.getUserContext(adminIdentity, "admin");

	return admin;
};

export const registerIdentity = async (login, password, org = "org1") => {
	try {
		const admin = await getAdminIdentity(org);

		const ca = createCA(org);
		await ca.register(
			{
				enrollmentID: login,
				enrollmentSecret: password,
			},
			admin
		);

		const enrollment = await ca.enroll({
			enrollmentID: login,
			enrollmentSecret: password,
		});

		const identity = createIdentity(org, enrollment);

		const wallet = await createWallet(org, login);
		await wallet.put(login, identity);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const loginIdentity = async (login, password, org = "org1") => {
	const ca = createCA(org);
	const enrollment = await ca.enroll({
		enrollmentSecret: password,
		enrollmentID: login,
	});
	const wallet = await createWallet(org, login);
	const identity = createIdentity(org, enrollment);
	await wallet.put(login, identity);
};

export const getContract = async (
	gateway,
	channelName,
	chaincode,
	contract
) => {
	const channel = await gateway.getNetwork(channelName);

	return await channel.getContract(chaincode, contract);
};
