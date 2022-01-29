import React, { useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SectionHeader } from "../../ui/SectionHeader";
import { ProfileNavigation } from "../../components/ProfileNavigation";
import { ProfileInfo } from "../../components/ProfileInfo";
import { MyEstates } from "../../components/MyEstates";
import { logoutThunk } from "../../store";
import { MyRents } from "../../components/MyRents";

export const ProfilePage = () => {
	const dispatch = useDispatch();

	const onLogout = useCallback(() => {
		dispatch(logoutThunk());
	}, [dispatch]);
	return (
		<main>
			<SectionHeader>Profile</SectionHeader>
			<ProfileInfo />
			<button onClick={onLogout}>Logout</button>
			<ProfileNavigation />
			<Routes>
				<Route path="estates/*" element={<MyEstates />} />
				<Route path="rents/*" element={<MyRents />} />
				<Route path="rent-offers" />
				<Route path="*" element={<Navigate to="estates" />} />
			</Routes>
		</main>
	);
};
