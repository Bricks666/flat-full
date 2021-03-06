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
		path: "/profile",
		children: "Profile",
	},
];

export const Navigation = () => {
	return (
		<nav>
			<List items={navigation} Card={NavigationItem} indexedBy="path" />
		</nav>
	);
};
