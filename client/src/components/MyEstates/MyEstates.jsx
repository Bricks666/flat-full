import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { List } from "../../ui/List";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { loadMyEstatesThunk } from "../../store";
import { EstateCard } from "../EstateCard";
import { Overlay } from "../../ui/Overlay";
import { NewRentForm } from "../NewRentForm";

export const MyEstates = () => {
	const estates = useSelector((state) => state.myEstates.list);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClose = useCallback(() => {
		navigate("", { replace: true });
	}, [navigate]);

	useEffect(() => {
		dispatch(loadMyEstatesThunk());
	}, [dispatch]);

	return (
		<section>
			<SubsectionHeader>My estates</SubsectionHeader>
			<Link to="new">Add rent</Link>
			<List items={estates} Card={EstateCard} indexedBy="builtAt" />
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
