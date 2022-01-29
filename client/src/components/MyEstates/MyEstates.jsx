import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../../ui/List";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { EstateCard } from "../EstateCard";
import { loadMyEstatesThunk } from "../../store";

export const MyEstates = () => {
	const estates = useSelector((state) => state.myEstates.list);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadMyEstatesThunk());
	}, [dispatch]);

	return (
		<section>
			<SubsectionHeader>My estates</SubsectionHeader>
			<List items={estates} Card={EstateCard} />
		</section>
	);
};
