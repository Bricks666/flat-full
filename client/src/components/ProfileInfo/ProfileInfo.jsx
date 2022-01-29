import React from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../selectors";

export const ProfileInfo = () => {
	const user = useSelector(getUserInfo);

	return (
		<section>
			<p>{`Name: ${user.login}`}</p>
			<p>{`Role: ${user.role}`}</p>
			<p>{`Balance: ${user.balance} coins`}</p>
			<p>{`Organization: ${user.organization}`}</p>
		</section>
	);
};
