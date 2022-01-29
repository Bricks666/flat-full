import React from "react";
import { SectionHeader } from "../../ui/SectionHeader";
import { List } from "../../ui/List";
import { RentCardWithCreateOffer } from "../../components/RentCardWithCreateOffer";
import { useRents } from "../../hooks";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { useSelector } from "react-redux";
import { getLoadingRents } from "../../selectors";

export const RentsPage = () => {
	const rents = useRents();
	const isLoading = useSelector(getLoadingRents);

	return (
		<main>
			<SectionHeader>Rents</SectionHeader>
			<LoadingWrapper isLoading={isLoading}>
				<List
					items={rents}
					Card={RentCardWithCreateOffer}
					indexedBy={"estateId"}
				/>
			</LoadingWrapper>
		</main>
	);
};
