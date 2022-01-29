import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../store";
import { routes } from "../../routes";
import { AuthRoute } from "../AuthRoute";
import { Navigation } from "../Navigation";

export const App = () => {
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authThunk());
	}, [dispatch]);

	if (isLoading) {
		return <p>Initialization</p>;
	}

	return (
		<div>
			<Navigation />
			<Routes>
				{routes.map(({ path, Component, isOnlyAuth }) => (
					<Route
						path={path}
						element={
							isOnlyAuth ? (
								<AuthRoute>
									<Component />
								</AuthRoute>
							) : (
								<Component />
							)
						}
						key={path}
					/>
				))}
			</Routes>
		</div>
	);
};
