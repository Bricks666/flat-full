import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { acceptRentOfferThunk, cancelRentOfferThunk } from "../../store";
import { RentOfferCard } from "../../ui/RentOfferCard";

export const ReceivedRentOfferCard = (props) => {
	const dispatch = useDispatch();
	const onCancel = useCallback(() => {
		dispatch(cancelRentOfferThunk(props.id));
	}, [dispatch, props.id]);
	const onAccept = useCallback(() => {
		dispatch(acceptRentOfferThunk(props.id));
	}, [dispatch, props.id]);
	return (
		<RentOfferCard {...props}>
			{!props.isFinish && <button onClick={onCancel}>Cancel</button>}
			{!props.isFinish && <button onClick={onAccept}>Accept</button>}
		</RentOfferCard>
	);
};
