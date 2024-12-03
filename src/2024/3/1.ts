const regexp = /mul\((\d{1,3}),(\d{1,3})\)/gu;

const firstPart = (input: string) => {
	let result = 0;

	for (const [, x, y] of input.matchAll(regexp))
		result += Number(x) * Number(y);
	return result;
};

export default firstPart;
