import React from "react";

export const RentCard = ({ estateId, price, time, isRent, children }) => {
	return (
		<article>
			<p>{`Estate number: ${estateId}`}</p>
			<p>{`Duration: ${time}`}</p>
			<p>{`Price: ${price}`}</p>
			<p>{`Is rent now: ${isRent ? "yes" : "no"}`}</p>
			{children}
		</article>
	);
};