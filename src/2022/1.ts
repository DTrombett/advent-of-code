import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2022/1");
const start = performance.now();

let sum = 0;
const elves = input
	.split("\n\n")
	.map((i) => i.split("\n").reduce((a, b) => a + Number(b), 0))
	.sort((a, b) => b - a);

for (let i = 0; i < 3; i++) sum += elves[i];
const [first] = elves;
const end = performance.now();

log(first, sum, time(start, end));
