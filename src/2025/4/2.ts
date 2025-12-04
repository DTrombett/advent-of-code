export default (input: string) => {
	const lines = input.split("\n").map((l) => Array.from(l));
	let totalCount = 0,
		count;

	do {
		count = 0;
		for (let i = 0; i < lines.length; i++)
			for (let j = 0; j < lines[i]!.length; j++)
				if (
					lines[i]![j] === "@" &&
					+(lines[i - 1]?.[j - 1] === "@") +
						+(lines[i - 1]?.[j] === "@") +
						+(lines[i - 1]?.[j + 1] === "@") +
						+(lines[i]![j - 1] === "@") +
						+(lines[i]![j + 1] === "@") +
						+(lines[i + 1]?.[j - 1] === "@") +
						+(lines[i + 1]?.[j] === "@") +
						+(lines[i + 1]?.[j + 1] === "@") <
						4
				) {
					count++;
					lines[i]![j] = ".";
				}
		totalCount += count;
	} while (count !== 0);
	return totalCount;
};
