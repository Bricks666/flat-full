import React from "react";

export const RentOfferCard = ({ lessee, rentId, isFinish, children }) => {
	return (
		<article>
			<p>{`Rent id: ${rentId}`}</p>
			<p>{`Lessee: ${lessee}`}</p>
			<p>{`Status: ${isFinish ? "Active" : "Finished"}`}</p>
			{children}
		</article>
	);
};
