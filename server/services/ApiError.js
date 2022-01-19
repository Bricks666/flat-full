export class ApiError extends Error {
	name = "ApiError";

	constructor(status, message) {
		super(message);
		this.status = status;
	}

	static UnAuthorization() {
		return new ApiError(401, "User is not authorization");
	}

	static BadRequest(message) {
		return new ApiError(400, message);
	}
}
