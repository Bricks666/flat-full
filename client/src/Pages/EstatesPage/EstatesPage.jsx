import React, { useCallback } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { List } from "../../ui/List";
import { SectionHeader } from "../../ui/SectionHeader";
import { EstateCard } from "../../ui/EstateCard";
import { NewEstateForm } from "../../components/NewEstateForm";
import { Overlay } from "../../ui/Overlay";
import { useEstates, useIsAdmin } from "../../hooks";
import { useSelector } from "react-redux";
import { getLoadingEstate } from "../../selectors";
import { LoadingWrapper } from "../../ui/LoadingWrapper";

export const EstatesPage = () => {
	const estates = useEstates();
	const isAdmin = useIsAdmin();
	const isLoading = useSelector(getLoadingEstate);
	const navigate = useNavigate();

	const onClose = useCallback(() => {
		navigate("", { replace: true });
	}, [navigate]);

	return (
		<main>
			<SectionHeader>Estates</SectionHeader>
			{isAdmin && <Link to="new">add estate</Link>}
			<LoadingWrapper isLoading={isLoading}>
				<List items={estates} Card={EstateCard} indexedBy={"builtAt"} />
			</LoadingWrapper>
			<Routes>
				<Route
					path="new"
					element={
						<Overlay isOpen={true} close={onClose}>
							<NewEstateForm />
						</Overlay>
					}
				/>
			</Routes>
		</main>
	);
};
