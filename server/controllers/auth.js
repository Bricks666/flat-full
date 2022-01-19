import { getGateway } from "../services/index.js";

export const auth = async (req, res, next) => {
	try {
		const { org, login } = req.body.user;

		const gateway = await getGateway();
	} catch (e) {
		next(e);
	}
};
