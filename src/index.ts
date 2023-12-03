import { readFile } from "node:fs/promises";
import { argv } from "node:process";

type ExecuteFunction = (input: string) => unknown;

const [input, { default: firstPart }, { default: secondPart }]: [
	string,
	{ default: ExecuteFunction },
	{ default?: ExecuteFunction },
] = await Promise.all([
	readFile(`./inputs/${argv[2]}`, { encoding: "utf-8" }),
	import(`./${argv[2]}/1.js`),
	import(`./${argv[2]}/2.js`).catch(() => ({})),
]);
const start = performance.now();
const firstResult = await firstPart(input);
const firstTime = performance.now();
const secondResult = await secondPart?.(input);
const secondTime = secondPart && performance.now();

console.log(
	"First part:",
	firstResult,
	`${firstTime - start}ms\nSecond part:`,
	secondPart ? secondResult : "N/A",
	secondTime !== undefined ? `${secondTime - firstTime}ms\n` : "",
	secondTime !== undefined ? `Total: ${secondTime - start}ms` : ""
);
