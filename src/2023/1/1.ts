const firstMatcher = /\d/gu;
const defaultArray = ["0"] as const;

const firstPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const match = string.match(firstMatcher) ?? defaultArray;

		return sum + parseInt(match[0] + match.at(-1), 10);
	}, 0);

export default firstPart;
