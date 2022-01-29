import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedRentOffers } from "../selectors";
import { loadRentOffersThunk } from "../store";

export const useReceivedRentOffers = () => {
	const rentOffers = useSelector(getReceivedRentOffers);

	const dispatch = useDispatch();

	useEffect(() => {
		if (rentOffers.length === 0) {
			dispatch(loadRentOffersThunk());
		}
	}, [rentOffers.length, dispatch]);

	return rentOffers;
};
