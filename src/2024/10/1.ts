const findHikes = (
	input: string,
	lineLength: number,
	index: number,
	number = 0,
	set = new Set<number>(),
): Set<number> => {
	if (number === 9) {
		set.add(index);
		return set;
	}
	number++;
	const next = number.toString();

	if (input[index - 1] === next)
		findHikes(input, lineLength, index - 1, number, set);
	if (input[index + 1] === next)
		findHikes(input, lineLength, index + 1, number, set);
	if (input[index - lineLength] === next)
		findHikes(input, lineLength, index - lineLength, number, set);
	if (input[index + lineLength] === next)
		findHikes(input, lineLength, index + lineLength, number, set);
	return set;
};

const firstPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	let result = 0;
	let i = 0;

	while ((i = input.indexOf("0", i + 1)) !== -1)
		result += findHikes(input, lineLength, i).size;
	return result;
};

export default firstPart;
