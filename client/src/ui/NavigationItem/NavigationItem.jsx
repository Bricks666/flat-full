import React from "react";
import { NavLink } from "react-router-dom";

export const NavigationItem = ({ path, children }) => {
	return (
		<NavLink
			to={path}
			style={({ isActive }) =>
				isActive ? { color: "red" } : { color: "blue" }
			}
		>
			{children}
		</NavLink>
	);
};
