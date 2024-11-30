const secondMatcher = /^(one|two|three|four|five|six|seven|eight|nine)/u;
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

const secondPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const array: string[] = [];

		for (let i = 0; i < string.length; i++)
			if (string[i] >= "0" && string[i] <= "9") array.push(string[i]);
			else {
				const value = secondMatcher.exec(string.slice(i))?.[0];

				if (value !== undefined) array.push(numbers[value]);
			}
		return sum + parseInt(`${array[0]}${array.at(-1)}`, 10);
	}, 0);

export default secondPart;
