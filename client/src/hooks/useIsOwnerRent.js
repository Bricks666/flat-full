import { useSelector } from "react-redux";
import { getMyEstatesIds } from "../selectors";

export const useIsOwnerRent = (estateId) => {
	return useSelector(getMyEstatesIds).includes(+estateId);
};
