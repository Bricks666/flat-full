import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRents } from "../selectors";
import { loadRentsThunk } from "../store";

export const useRents = () => {
	const rents = useSelector(getRents);

	const dispatch = useDispatch();

	useEffect(() => {
		if (rents.length === 0) {
			dispatch(loadRentsThunk());
		}
	}, [dispatch, rents.length]);

	return rents;
};
