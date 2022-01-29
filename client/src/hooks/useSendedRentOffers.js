import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSendedRentOffers } from "../selectors";
import { loadRentOffersThunk } from "../store";

export const useSendedRentOffers = () => {
	const rentOffers = useSelector(getSendedRentOffers);

	const dispatch = useDispatch();

	useEffect(() => {
		if (rentOffers.length === 0) {
			dispatch(loadRentOffersThunk());
		}
	}, [rentOffers.length, dispatch]);

	return rentOffers;
};
