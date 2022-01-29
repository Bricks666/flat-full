import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEstates } from "../selectors";
import { loadEstatesThunk } from "../store";

export const useMyEstates = () => {
	const estates = useSelector(getMyEstates);
	const dispatch = useDispatch();

	useEffect(() => {
		if (estates.length === 0) {
			dispatch(loadEstatesThunk());
		}
	}, [estates.length, dispatch]);

	return estates;
};
