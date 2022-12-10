import { getInput, time } from "../utils";

const input = getInput("2022/10");
const start = performance.now();

const spriteWidth = 3,
	// eslint-disable-next-line sort-vars
	sideWidth = (spriteWidth - 1) / 2,
	width = 40;
const lines = input.split("\n");
const crt = Array.from({ length: 6 }, () => new Array<boolean>(width));
let cycle = 0,
	row = 0,
	x = 1;
const fillCRT = () => {
	crt[row][cycle] = cycle >= x - sideWidth && cycle <= x + sideWidth;
};
const increaseCycle = () => {
	fillCRT();
	cycle = (cycle + 1) % 40;
	if (cycle === 0) row++;
};

for (const line of lines) {
	increaseCycle();
	const [cmd, arg] = line.split(" ");

	if (cmd === "addx") {
		increaseCycle();
		x += Number(arg);
	}
}
const display = crt
	.map((r) => r.map((v) => (v ? "#" : ".")).join(""))
	.join("\n");
const end = performance.now();

console.log(display, time(start, end));
