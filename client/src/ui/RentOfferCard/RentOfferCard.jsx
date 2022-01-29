import React from "react";

export const RentOfferCard = ({ lessee, rentId, isFinish, children }) => {
	return (
		<article>
			<div></div>
			<p>{`Lessee: ${lessee}`}</p>
			<p>{`Status: ${isFinish ? "Finished" : "Active"}`}</p>
			{children}
		</article>
	);
};
