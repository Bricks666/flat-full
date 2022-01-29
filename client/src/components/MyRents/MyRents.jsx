import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RentCard } from "../RentCard";
import { List } from "../../ui/List";
import { loadMyRentsThunk } from "../../store";

export const MyRents = () => {
	const rents = useSelector((state) => state.myRents.list);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadMyRentsThunk());
	}, [dispatch]);

	return <List items={rents} Card={RentCard} indexedBy="estateId" />;
};
