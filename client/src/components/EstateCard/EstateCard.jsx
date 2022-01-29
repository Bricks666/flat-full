export const EstateCard = ({ owner, square, builtAt }) => {
	return (
		<div>
			<p>{`Owner: ${owner}`}</p>
			<p>{`Square: ${square}`}</p>
			<p>{`Build at: ${builtAt}`}</p>
		</div>
	);
};
