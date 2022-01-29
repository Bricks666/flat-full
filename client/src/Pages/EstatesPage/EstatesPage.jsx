import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { List } from "../../ui/List";
import { loadEstatesThunk } from "../../store";
import { SectionHeader } from "../../ui/SectionHeader";
import { EstateCard } from "../../components/EstateCard";
import { NewEstateForm } from "../../components/NewEstateForm";
import { Overlay } from "../../ui/Overlay";
import { useCallback } from "react";

export const EstatesPage = () => {
	const estates = useSelector((state) => state.estates.list);
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => state.user.info.role === "Admin");
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadEstatesThunk());
	}, [dispatch]);

	const onClose = useCallback(() => {
		navigate("", { replace: true });
	}, [navigate]);

	return (
		<main>
			<SectionHeader>Estates</SectionHeader>
			{isAdmin && <Link to="new">add estate</Link>}
			<List items={estates} Card={EstateCard} indexedBy={"builtAt"} />
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
