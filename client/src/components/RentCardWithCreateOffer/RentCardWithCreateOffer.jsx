import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { RentCard } from "../../ui/RentCard";
import { useIsOwnerRent } from "../../hooks";

export const RentCardWithCreateOffer = (props) => {
	const isRentOfMyEstate = useIsOwnerRent(props.estateId);

	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		dispatch();
	}, [dispatch]);

	return (
		<RentCard {...props}>
			<button onClick={onClick} disabled={props.isRent || isRentOfMyEstate}>
				Create rent offer
			</button>
		</RentCard>
	);
};
