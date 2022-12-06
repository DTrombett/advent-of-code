import { getInput, time } from "../utils";

const input = getInput("2022/1");
const start = performance.now();

let sum = 0;
const elves = input
	.split("\n\n")
	.map((i) => i.split("\n").reduce((a, b) => a + Number(b), 0))
	.sort((a, b) => b - a);

for (let i = 0; i < 3; i++) sum += elves[i];
const end = performance.now();

console.log(elves[0], sum, time(start, end));
