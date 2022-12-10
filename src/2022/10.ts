import { getInput, time } from "../utils";

const input = getInput("2022/10");
const start = performance.now();

const lines = input.split("\n");
const cycles: number[] = [];
let cycle = 1,
	strengthSum = 0,
	x = 1;
const checkCycle = () => {
	if (cycles.includes(cycle)) strengthSum += cycle * x;
};

for (let c = 20; c <= 220; c += 40) cycles.push(c);
for (let i = 0; i < lines.length; i++, cycle++) {
	const [cmd, arg] = lines[i].split(" ");

	checkCycle();
	if (cmd === "noop") continue;
	else if (cmd === "addx") {
		cycle++;
		checkCycle();
		x += Number(arg);
	}
}
const end = performance.now();

console.log(strengthSum, time(start, end));
