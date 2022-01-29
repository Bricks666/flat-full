import React, { useSelector } from "react-redux";
import { useReceivedRentOffers } from "../../hooks";
import { List } from "../../ui/List";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { ReceivedRentOfferCard } from "../ReceivedRentOfferCard";

export const ReceivedRentOffers = () => {
	const rentOffers = useReceivedRentOffers();
	console.log(rentOffers);
	const isLoading = useSelector((state) => state.rentOffers.isLoading);

	return (
		<section>
			<SubsectionHeader>Received rent offers</SubsectionHeader>
			<LoadingWrapper isLoading={isLoading}>
				<List items={rentOffers} Card={ReceivedRentOfferCard} indexedBy="id" />
			</LoadingWrapper>
		</section>
	);
};
