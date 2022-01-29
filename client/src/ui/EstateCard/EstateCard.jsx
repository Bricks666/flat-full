export const EstateCard = ({ owner, square, builtAt, children }) => {
	return (
		<div>
			<p>{`Owner: ${owner}`}</p>
			<p>{`Square: ${square}`}</p>
			<p>{`Build at: ${builtAt}`}</p>
			{children}
		</div>
	);
};
