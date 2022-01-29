import { LoginPage } from "../Pages/LoginPage";
import { RegistrationPage } from "../Pages/RegistrationPage";
import { ProfilePage } from "../Pages/ProfilePage";
import { EstatesPage } from "../Pages/EstatesPage";
import { RentsPage } from "../Pages/RentsPage";

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
	{
		path: "/rents/*",
		Component: RentsPage,
		isOnlyAuth: true,
	},
];
