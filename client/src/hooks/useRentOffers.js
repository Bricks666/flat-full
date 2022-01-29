import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRentOffers } from "../api";
import { loadRentOffersThunk } from "../store";

export const useRentOffers = () => {
	const rentOffers = useSelector(getRentOffers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (rentOffers.length === 0) {
			dispatch(loadRentOffersThunk());
		}
	}, [dispatch, rentOffers.length]);

	return rentOffers;
};
