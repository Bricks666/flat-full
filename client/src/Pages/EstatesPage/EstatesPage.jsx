import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../../ui/List";
import { loadEstatesThunk } from "../../store";
import { SectionHeader } from "../../ui/SectionHeader";
import { EstateCard } from "../../components/EstateCard";
import { Link, Route, Routes } from "react-router-dom";

export const EstatesPage = () => {
	const estates = useSelector((state) => state.estates.list);
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => state.user.info.role === "Admin");

	useEffect(() => {
		dispatch(loadEstatesThunk());
	}, [dispatch]);

	return (
		<main>
			<SectionHeader>Estates</SectionHeader>
			{isAdmin && <Link to="new">add estate</Link>}
			<List items={estates} Card={EstateCard} indexedBy={"buildAt"} />
			<Routes>
				<Route path="new" element />
			</Routes>
		</main>
	);
};
