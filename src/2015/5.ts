import { getInput, time } from "../utils";

const input = getInput("2015/5");
const start = performance.now();

const lines = input.split("\n");
const vowels = ["a", "e", "i", "o", "u"];
const disallowed = ["ab", "cd", "pq", "xy"];
let count = 0;

for (const line of lines) {
	let double = true,
		v = 0;

	for (let i = 0; i < line.length && (double || v !== 3); i++) {
		if (v !== 3 && vowels.includes(line[i])) v++;
		if (double && line[i] === line[i + 1]) double = false;
	}
	if (!double && v === 3 && disallowed.every((dis) => !line.includes(dis)))
		count++;
}
const end = performance.now();

console.log(count, time(start, end));
