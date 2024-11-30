import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2015/5");
const start = performance.now();

const lines = input.split("\n");
let count = 0;

for (const string of lines) {
	let double = true,
		repeating = true;

	for (
		let i = 0;
		i < string.length && (double || (repeating && i !== string.length - 1));
		i++
	) {
		if (
			repeating &&
			(string.match(new RegExp(string.slice(i, i + 2), "gu"))?.length ?? 0) > 1
		)
			repeating = false;
		if (double && string[i] === string[i + 2]) double = false;
	}
	if (!(double || repeating)) count++;
}
const end = performance.now();

log(count, time(start, end));
