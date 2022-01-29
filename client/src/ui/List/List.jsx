export const List = ({ items, Card, indexedBy }) => {
	return (
		<ul>
			{items.map((item) => (
				<li>
					<Card {...item} kay={item[indexedBy]} />
				</li>
			))}
		</ul>
	);
};
