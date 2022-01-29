import React from "react";
import { useSelector } from "react-redux";

export const ProfileInfo = () => {
	const user = useSelector((state) => state.user.info);

	return (
		<section>
			<p>{`Name: ${user.login}`}</p>
			<p>{`Role: ${user.role}`}</p>
			<p>{`Balance: ${user.balance} coins`}</p>
			<p>{`Organization: ${user.organization}`}</p>
		</section>
	);
};
