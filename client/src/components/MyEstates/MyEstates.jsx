import React from "react";
import { useSelector } from "react-redux";
import { List } from "../../ui/List";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { EstateCard } from "../../ui/EstateCard";

import { useMyEstates } from "../../hooks";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { getLoadingEstate } from "../../selectors";

export const MyEstates = () => {
	const estates = useMyEstates();
	const isLoading = useSelector(getLoadingEstate);

	return (
		<section>
			<SubsectionHeader>My estates</SubsectionHeader>
			<LoadingWrapper isLoading={isLoading}>
				<List items={estates} Card={EstateCard} indexedBy="builtAt" />
			</LoadingWrapper>
		</section>
	);
};
