import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../store";
import { routes } from "../../routes";

export const App = () => {
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authThunk());
	}, [dispatch]);

	if (isLoading) {
		return <p>Initialization</p>;
	}
	console.log(isLoading);

	return (
		<div>
			<Routes>
				{routes.map(({ path, Component }) => (
					<Route path={path} element={<Component />} key={path} />
				))}
			</Routes>
		</div>
	);
};
