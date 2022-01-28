import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthRoute = ({ children, redirect = "/login" }) => {
	const isLogin = useSelector((state) => state.user.isLogin);
	const location = useLocation();

	if (!isLogin) {
		return <Navigate to={redirect} state={location} replace={true} />;
	}

	return children;
};
