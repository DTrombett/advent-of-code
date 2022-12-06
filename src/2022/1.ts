import { getInput } from "../getInput";

const elves = getInput("2022/1")
	.split("\n\n")
	.map((i) => i.split("\n").reduce((a, b) => a + Number(b), 0))
	.sort((a, b) => b - a);
let sum = 0;

for (let i = 0; i < 3; i++) sum += elves[i];
console.log(elves[0], sum);
