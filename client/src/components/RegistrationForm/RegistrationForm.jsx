import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocationState } from "../../hooks";
import { registrationThunk } from "../../store";

export const RegistrationForm = () => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const state = useLocationState();

	const onLoginChange = useCallback(
		(evt) => {
			setLogin(evt.target.value);
		},
		[setLogin]
	);
	const onPasswordChange = useCallback(
		(evt) => {
			setPassword(evt.target.value);
		},
		[setPassword]
	);

	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();

			setIsSubmitting(true);
			const response = await dispatch(registrationThunk(login, password));
			console.log(response);
			setLogin("");
			setPassword("");
			setIsSubmitting(false);

			if (response) {
				const to = state?.pathname || "/login";
				navigate(to, { replace: true });
			}
		},
		[dispatch, login, password, navigate, state?.pathname]
	);
	return (
		<form onSubmit={onSubmit}>
			<input value={login} onChange={onLoginChange} />
			<input value={password} onChange={onPasswordChange} type="password" />
			<button disabled={isSubmitting}>Login</button>
		</form>
	);
};
