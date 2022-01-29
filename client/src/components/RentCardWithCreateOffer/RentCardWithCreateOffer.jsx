import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { RentCard } from "../../ui/RentCard";
import { useIsOwnerRent } from "../../hooks";
import { addRentOfferThunk } from "../../store";

export const RentCardWithCreateOffer = (props) => {
	const isRentOfMyEstate = useIsOwnerRent(props.owner);

	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		dispatch(addRentOfferThunk(props.id));
	}, [dispatch, props.id]);
  console.log(props)
	return (
		<RentCard {...props}>
			<button onClick={onClick} disabled={props.isRent || isRentOfMyEstate}>
				Create rent offer
			</button>
		</RentCard>
	);
};
