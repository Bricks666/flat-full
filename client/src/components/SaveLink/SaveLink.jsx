import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocationState } from "../../hooks";

export const SaveLink = ({ to, children }) => {
	const state = useLocationState();
	const location = useLocation();

	return (
		<Link to={to} state={state || location}>
			{children}
		</Link>
	);
};
