import { LoginPage } from "../Pages/LoginPage";
import { RegistrationPage } from "../Pages/RegistrationPage";
import { ProfilePage } from "../Pages/ProfilePage";
import { EstatesPage } from "../Pages/EstatesPage";

export const routes = [
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		path: "/registration",
		Component: RegistrationPage,
	},
	{
		path: "/profile/*",
		Component: ProfilePage,
		isOnlyAuth: true,
	},
	{
		path: "/estates/*",
		Component: EstatesPage,
		isOnlyAuth: false,
	},
];
