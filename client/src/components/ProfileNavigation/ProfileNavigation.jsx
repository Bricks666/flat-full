import React from "react";
import { NavigationItem } from "../../ui/NavigationItem";

const routes = [
	{
		path: "estates",
		name: "Estates",
	},
	{
		path: "rents",
		name: "Rents",
	},
	{
		path: "rent-offers",
		name: "Rent offers",
	},
];

export const ProfileNavigation = () => {
	return (
		<ul>
			{routes.map(({ path, name }) => (
				<li key={path}>
					<NavigationItem path={path}>{name}</NavigationItem>
				</li>
			))}
		</ul>
	);
};
