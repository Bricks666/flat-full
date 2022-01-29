export const LoadingWrapper = ({ isLoading, children }) => {
	return isLoading ? <h2>Loading...</h2> : children;
};
