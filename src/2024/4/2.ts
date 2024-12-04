const arr = ["MS", "SM"];
const searchString = "A";

const secondPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1,
		llm = lineLength - 1,
		llp = lineLength + 1;
	let count = 0;
	let i = 0;

	while ((i = input.indexOf(searchString, i + 1)) !== -1) {
		const relativeIndex = i % lineLength;

		if (
			relativeIndex > 0 &&
			lineLength - relativeIndex > 2 &&
			arr.includes(`${input[i - llp]}${input[i + llp]}`) &&
			arr.includes(`${input[i - llm]}${input[i + llm]}`)
		)
			count++;
	}
	return count;
};

export default secondPart;
