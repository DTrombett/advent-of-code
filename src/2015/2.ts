import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2015/2");
const start = performance.now();

const result = input.split("\n").reduce((sum, line) => {
	const array = line
		.split("x")
		.map((n) => Number(n))
		.sort((a, b) => a - b);

	return sum + array[0] * 2 + array[1] * 2 + array[0] * array[1] * array[2];
}, 0);
const end = performance.now();

log(result, time(start, end));
