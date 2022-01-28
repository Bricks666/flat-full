import React from "react";
import { LoginForm } from "../../components/LoginFrom/LoginForm";
import { SectionHeader } from "../../ui/SectionHeader";
import { SaveLink } from "../../components/SaveLink";

export const LoginPage = ({ className }) => {
	return (
		<main className={className}>
			<SectionHeader>Login</SectionHeader>
			<LoginForm />
			<SaveLink to="/registration">Registration</SaveLink>
		</main>
	);
};
