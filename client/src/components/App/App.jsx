import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../store";
import { routes } from "../../routes";
import { AuthRoute } from "../AuthRoute";
import { Navigation } from "../Navigation";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { getLoadingUser } from "../../selectors";

export const App = () => {
	const isLoading = useSelector(getLoadingUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authThunk());
	}, [dispatch]);

	return (
		<LoadingWrapper isLoading={isLoading}>
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
		</LoadingWrapper>
	);
};
