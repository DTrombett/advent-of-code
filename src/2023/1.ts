const firstMatcher = /\d/g;
const defaultArray = ["0"] as const;
const secondMatcher = /^(one|two|three|four|five|six|seven|eight|nine)/;
const numbers: Record<string, string> = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

export const firstPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const match = string.match(firstMatcher) ?? defaultArray;

		return sum + parseInt(match[0] + match.at(-1));
	}, 0);

export const secondPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const array: string[] = [];

		for (let i = 0; i < string.length; i++)
			if (string[i]! >= "0" && string[i]! <= "9") array.push(string[i]!);
			else {
				const value = string.slice(i).match(secondMatcher)?.[0];

				if (value !== undefined) array.push(numbers[value]!);
			}
		return sum + parseInt(`${array[0]}${array.at(-1)}`);
	}, 0);
