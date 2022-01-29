import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { RentOfferCard } from "../../ui/RentOfferCard";
import { cancelRentOfferThunk } from "../../store";

export const SendedRentOfferCard = (props) => {
	const dispatch = useDispatch();
	const onClick = useCallback(() => {
		dispatch(cancelRentOfferThunk(props.id));
	}, [dispatch, props.id]);
	console.log(props);
	return (
		<RentOfferCard {...props}>
			{!props.isFinish && <button onClick={onClick}>Cancel</button>}
		</RentOfferCard>
	);
};
