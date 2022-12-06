import { getInput, time } from "../utils";

const input = getInput("2022/5");
const start = performance.now();

const inputs = input.split(/\s\s(?:[1-9]\s+)+/);
const crates: string[][] = [];

for (const line of inputs[0].split("\n")) {
	const letters = line.match(/.{1,4}/g);

	if (!letters) continue;
	for (let i = 0; i < letters.length; i++)
		if (letters[i][1] !== " ") (crates[i] ??= []).push(letters[i][1]);
}
for (const instruction of inputs[1].split("\n")) {
	const instructions = instruction.match(/\d+/g)?.map((d) => Number(d));

	if (!instructions) continue;
	crates[instructions[2] - 1].unshift(
		...crates[instructions[1] - 1].splice(0, instructions[0])
	);
}
const result = crates.map((c) => c[0]).join("");
const end = performance.now();

console.log(result, time(start, end));
