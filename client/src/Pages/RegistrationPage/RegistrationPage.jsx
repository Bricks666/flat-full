import React from "react";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import { SaveLink } from "../../components/SaveLink";
import { SectionHeader } from "../../ui/SectionHeader";

export const RegistrationPage = () => {
	return (
		<main>
			<SectionHeader>Registration</SectionHeader>
			<RegistrationForm />
			<SaveLink to="/login">Login</SaveLink>
		</main>
	);
};
