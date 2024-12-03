const regexp = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gu;

const secondPart = (input: string) => {
	let result = 0;
	let enabled = true;

	for (const [instruction, x, y] of input.matchAll(regexp))
		if (instruction === "do()") enabled = true;
		else if (instruction === "don't()") enabled = false;
		else if (enabled) result += Number(x) * Number(y);
	return result;
};

export default secondPart;
