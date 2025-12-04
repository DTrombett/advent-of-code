export default (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	let count = 0;

	for (let i = 0; i < input.length; i++)
		if (
			input[i] === "@" &&
			+(input[i - lineLength - 1] === "@") +
				+(input[i - lineLength] === "@") +
				+(input[i - lineLength + 1] === "@") +
				+(input[i - 1] === "@") +
				+(input[i + 1] === "@") +
				+(input[i + lineLength - 1] === "@") +
				+(input[i + lineLength] === "@") +
				+(input[i + lineLength + 1] === "@") <
				4
		)
			count++;
	return count;
};
