import { useSelector } from "react-redux";

export const useIsAdmin = () => {
	return useSelector((state) => state.user.info.role === "Admin");
};
