import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SectionHeader } from "../../ui/SectionHeader";
import { List } from "../../ui/List";
import { loadRentsThunk } from "../../store";
import { RentCard } from "../../components/RentCard";

export const RentsPage = () => {
	const rents = useSelector((state) => state.rents.list);
	console.log(rents);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadRentsThunk());
	}, [dispatch]);

	return (
		<main>
			<SectionHeader>Rents</SectionHeader>
			<List items={rents} Card={RentCard} indexedBy={"estateId"} />
		</main>
	);
};
