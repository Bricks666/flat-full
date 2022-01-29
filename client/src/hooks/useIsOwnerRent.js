import { useSelector } from "react-redux";
import { getUserLogin } from "../selectors";

export const useIsOwnerRent = (rentOwner) => {
	return useSelector(getUserLogin) === rentOwner;
};
