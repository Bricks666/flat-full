import React from "react";
import { useSelector } from "react-redux";
import { useSendedRentOffers } from "../../hooks";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { List } from "../../ui/List";
import { SendedRentOfferCard } from "../SendedRentOfferCard";

export const SendedRentOffers = () => {
	const rentOffers = useSendedRentOffers();
	const isLoading = useSelector((state) => state.rentOffers.isLoading);

	return (
		<section>
			<SubsectionHeader>Sended rent offers</SubsectionHeader>
			<LoadingWrapper isLoading={isLoading}>
				<List items={rentOffers} Card={SendedRentOfferCard} indexedBy="id" />
			</LoadingWrapper>
		</section>
	);
};
