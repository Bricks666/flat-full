import React from "react";
import { List } from "../../ui/List";
import { NavigationItem } from "../../ui/NavigationItem";

const navigation = [
	{
		path: "/estates",
		children: "Estates",
	},
	{
		path: "/rents",
		children: "Rents",
	},
	{
		path: "/rent-offers",
		children: "Rent offers",
	},
	{
		path: "/profile",
		children: "Profile",
	},
];

export const Navigation = () => {
	return (
		<nav>
			<List items={navigation} Card={NavigationItem} indexedBy="children" />
		</nav>
	);
};
