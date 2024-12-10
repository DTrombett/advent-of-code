const findHikes = (
	input: string,
	lineLength: number,
	index: number,
	number = 0,
	count = 0,
): number => {
	if (number === 9) return count + 1;
	number++;
	const next = number.toString();

	if (input[index - 1] === next)
		count = findHikes(input, lineLength, index - 1, number, count);
	if (input[index + 1] === next)
		count = findHikes(input, lineLength, index + 1, number, count);
	if (input[index - lineLength] === next)
		count = findHikes(input, lineLength, index - lineLength, number, count);
	if (input[index + lineLength] === next)
		count = findHikes(input, lineLength, index + lineLength, number, count);
	return count;
};

const secondPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	let result = 0;
	let i = 0;

	while ((i = input.indexOf("0", i + 1)) !== -1)
		result += findHikes(input, lineLength, i);
	return result;
};

export default secondPart;
