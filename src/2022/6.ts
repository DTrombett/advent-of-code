import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2022/6");
const start = performance.now();

const chars = 14;
let result = 0;

for (let i = chars; i < input.length; i++) {
	const m = input.slice(i - chars, i);

	if ([...m].every((c, j) => !m.slice(0, j).includes(c))) {
		result = i;
		break;
	}
}
const end = performance.now();

log(result, time(start, end));
