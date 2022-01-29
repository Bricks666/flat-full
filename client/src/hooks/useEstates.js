import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEstates } from "../selectors";
import { loadEstatesThunk } from "../store";

export const useEstates = () => {
	const dispatch = useDispatch();
	const estates = useSelector(getEstates);

	useEffect(() => {
		if (estates.length === 0) {
			dispatch(loadEstatesThunk());
		}
	}, [estates.length, dispatch]);

	return estates;
};
