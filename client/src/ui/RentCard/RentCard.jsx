import React from "react";

export const RentCard = ({
	owner,
	square,
	price,
	time,
	isRent,
	builtAt,
	children,
}) => {
	return (
		<article>
			<div>
				<p>About estate</p>
				<p>{`Owner: ${owner}`}</p>
				<p>{`Square: ${square}`}</p>
				<p>{`Built at: ${builtAt}`}</p>
			</div>
			<p>{`Duration: ${time}`}</p>
			<p>{`Price: ${price}`}</p>
			<p>{`Is rent now: ${isRent ? "yes" : "no"}`}</p>
			{children}
		</article>
	);
};
