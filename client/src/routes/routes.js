import { LoginPage } from "../Pages/LoginPage";
import { RegistrationPage } from "../Pages/RegistrationPage";
import { ProfilePage } from "../Pages/ProfilePage";

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
		path: "/",
		Component: ProfilePage,
		isOnlyAuth: true,
	},
];
