import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { RentCard } from "../../ui/RentCard";
import { List } from "../../ui/List";
import { useMyRents } from "../../hooks";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { getLoadingRents } from "../../selectors";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { Overlay } from "../../ui/Overlay";
import { NewRentForm } from "../NewRentForm";

export const MyRents = () => {
	const rents = useMyRents();
	const isLoading = useSelector(getLoadingRents);

	const navigate = useNavigate();

	const onClose = useCallback(() => {
		navigate("", { replace: true });
	}, [navigate]);

	return (
		<section>
			<SubsectionHeader>My Rents</SubsectionHeader>
			<Link to="new">Add rent</Link>
			<LoadingWrapper isLoading={isLoading}>
				<List items={rents} Card={RentCard} indexedBy="estateId" />
			</LoadingWrapper>
			<Routes>
				<Route
					path="new"
					element={
						<Overlay isOpen={true} close={onClose}>
							<NewRentForm />
						</Overlay>
					}
				/>
			</Routes>
		</section>
	);
};
