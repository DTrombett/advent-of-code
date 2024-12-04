const searchString = "X";

const firstPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1,
		ll2 = lineLength * 2,
		ll3 = lineLength * 3,
		llm = lineLength - 1,
		llm2 = llm * 2,
		llm3 = llm * 3,
		llp = lineLength + 1,
		llp2 = llp * 2,
		llp3 = llp * 3;
	let count = 0;
	let i = -1;

	while ((i = input.indexOf(searchString, i + 1)) !== -1) {
		const relativeIndex = i % lineLength;

		if (lineLength - relativeIndex > 4) {
			if (input.slice(i, i + 4) === "XMAS") count++;
			if (`${input[i - llm]}${input[i - llm2]}${input[i - llm3]}` === "MAS")
				count++;
			if (`${input[i + llp]}${input[i + llp2]}${input[i + llp3]}` === "MAS")
				count++;
		}
		if (relativeIndex >= 3) {
			if (input.slice(i - 3, i) === "SAM") count++;
			if (`${input[i - llp]}${input[i - llp2]}${input[i - llp3]}` === "MAS")
				count++;
			if (`${input[i + llm]}${input[i + llm2]}${input[i + llm3]}` === "MAS")
				count++;
		}
		if (`${input[i + lineLength]}${input[i + ll2]}${input[i + ll3]}` === "MAS")
			count++;
		if (`${input[i - lineLength]}${input[i - ll2]}${input[i - ll3]}` === "MAS")
			count++;
	}
	return count;
};

export default firstPart;
