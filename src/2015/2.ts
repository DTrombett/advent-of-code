import { getInput, time } from "../utils";

const input = getInput("2015/2");
const start = performance.now();

const result = input.split("\n").reduce((sum, line) => {
	const array = line
		.split("x")
		.map((n) => Number(n))
		.sort((a, b) => a - b);

	return (
		sum +
		3 * array[0] * array[1] +
		2 * array[1] * array[2] +
		2 * array[0] * array[2]
	);
}, 0);
const end = performance.now();

console.log(result, time(start, end));
