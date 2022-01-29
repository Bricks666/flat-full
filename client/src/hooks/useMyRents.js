import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyRents } from "../selectors";
import { loadRentsThunk } from "../store";

export const useMyRents = () => {
	const rents = useSelector(getMyRents);

	const dispatch = useDispatch();

	useEffect(() => {
		if (rents.length === 0) {
			dispatch(loadRentsThunk());
		}
	}, [dispatch, rents.length]);

	return rents;
};
