import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEstateThunk } from "../../store";

export const NewEstateForm = () => {
	const [owner, setOwner] = useState("");
	const [square, setSquare] = useState("");
	const [builtAt, setBuiltAt] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onOwnerChange = useCallback(
		(evt) => {
			setOwner(evt.target.value);
		},
		[setOwner]
	);
	const onSquareChange = useCallback(
		(evt) => {
			setSquare(evt.target.value);
		},
		[setSquare]
	);
	const onBuiltAtChange = useCallback(
		(evt) => {
			setBuiltAt(evt.target.value);
		},
		[setBuiltAt]
	);

	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			setIsSubmitting(true);
			await dispatch(addEstateThunk(owner, square, builtAt));
      debugger
			navigate(-1);
		},
		[dispatch, navigate, setIsSubmitting, builtAt, owner, square]
	);

	return (
		<form onSubmit={onSubmit}>
			<input value={owner} onChange={onOwnerChange} />
			<input value={square} type="number" onChange={onSquareChange} />
			<input value={builtAt} type="date" onChange={onBuiltAtChange} />
			<button disabled={isSubmitting}>Add estate</button>
		</form>
	);
};
