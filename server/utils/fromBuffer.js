export const fromBuffer = (buffer) => {
	const string = buffer.toString();
	return string && JSON.parse(string);
};
