import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2015/6");
const start = performance.now();

const lines = input.split("\n");
const lights = Array.from({ length: 1_000 }, () =>
	new Array<number>(1_000).fill(0),
);

for (const l of lines) {
	const split = l.split(" ");

	if (split[0] === "turn") split.splice(0, 1);
	const [startX, startY, endX, endY] = [split[1], split[3]].flatMap((el) =>
		el.split(",").map((n) => Number(n)),
	);
	const add = split[0] === "on" ? 1 : split[0] === "toggle" ? 2 : -1;

	for (let x = startX; x <= endX; x++)
		for (let y = startY; y <= endY; y++)
			lights[x][y] += add > 0 || lights[x][y] ? add : 0;
}
const brightness = lights.flat().reduce((a, b) => a + b);
const end = performance.now();

log(brightness, time(start, end));
