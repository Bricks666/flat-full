import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SectionHeader } from "../../ui/SectionHeader";
import { ProfileNavigation } from "../../components/ProfileNavigation";
import { ProfileInfo } from "../../components/ProfileInfo";
import { MyEstates } from "../../components/MyEstates";
import { logoutThunk } from "../../store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

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
				<Route path="estates" element={<MyEstates />} />
				<Route path="rents" />
				<Route path="rent-offers" />
				<Route path="*" element={<Navigate to="estates" />} />
			</Routes>
		</main>
	);
};
