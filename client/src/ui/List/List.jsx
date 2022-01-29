export const List = ({ items, Card, indexedBy }) => {
	return (
		<ul>
			{items.map((item) => (
				<li>
					<Card {...item} key={item[indexedBy]} />
				</li>
			))}
		</ul>
	);
};
