import React from "react";
import { List } from "../../ui/List";
import { NavigationItem } from "../../ui/NavigationItem";

const routes = [
	{
		path: "estates",
		children: "Estates",
	},
	{
		path: "rents",
		children: "Rents",
	},
	{
		path: "rent-offers",
		children: "Rent offers",
	},
];

export const ProfileNavigation = () => {
	return <List items={routes} Card={NavigationItem} indexedBy={"path"} />;
};
