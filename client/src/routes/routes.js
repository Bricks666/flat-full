import { LoginPage } from "../Pages/LoginPage";

export const routes = [
	{
		path: "/login",
		Component: LoginPage,
		isOnlyAuth: false,
	},
];
