import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMyEstates } from "../../hooks";
import { addRentThunk } from "../../store";

export const NewRentForm = () => {
	const estates = useMyEstates();

	const dispatch = useDispatch();
	const [estateId, setEstateId] = useState(estates[0]?.id);
	const [price, setPrice] = useState(0);
	const [time, setTime] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const onEstateIdChange = useCallback(
		(evt) => {
			setEstateId(evt.target.value);
		},
		[setEstateId]
	);
	const onPriceChange = useCallback(
		(evt) => {
			setPrice(evt.target.value);
		},
		[setPrice]
	);
	const onTimeChange = useCallback(
		(evt) => {
			setTime(evt.target.value);
		},
		[setTime]
	);

	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			setIsSubmitting(true);
			await dispatch(addRentThunk(estateId, price, time));
			setPrice(0);
			setTime("");
			setEstateId(estates[0]?.id);
			navigate("", { replace: true });
		},
		[
			dispatch,
			navigate,
			setPrice,
			setTime,
			setEstateId,
			setIsSubmitting,
			estateId,
			price,
			time,
			estates,
		]
	);

	return (
		<form onSubmit={onSubmit}>
			<select value={estateId} onChange={onEstateIdChange}>
				{estates.map(({ id, square, builtAt }) => (
					<option value={id} key={id}>
						{`Estate id: ${id}`}
						{`Square: ${square}`}
						{`Built at: ${builtAt}`}
					</option>
				))}
			</select>
			<input value={price} type="number" onChange={onPriceChange} />
			<input value={time} type="date" onChange={onTimeChange} />
			<button disabled={isSubmitting}>Add rent</button>
		</form>
	);
};
