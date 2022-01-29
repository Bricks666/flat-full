export const List = ({ items, Card, indexedBy }) => {
	return (
		<ul>
			{items.map((item) => (
				<li key={item[indexedBy]}>
					<Card {...item} />
				</li>
			))}
		</ul>
	);
};
