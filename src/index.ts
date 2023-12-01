import { readFile } from "node:fs/promises";
import { argv } from "node:process";

type FirstPart = (input: string) => unknown;
type SecondPart = (input: string, result: unknown) => unknown;

const [file, input]: [
	{ firstPart: FirstPart; secondPart?: SecondPart },
	string,
] = await Promise.all([
	import(`./${argv[2]}.js`),
	readFile(`./inputs/${argv[2]}`, { encoding: "utf-8" }),
]);

if (argv[3] === "1") {
	const start = performance.now();

	console.log(await file.firstPart(input), `${performance.now() - start}ms`);
} else {
	const start = performance.now();
	const firstPart = await file.firstPart(input);
	const firstTime = performance.now();
	const secondPart = await file.secondPart?.(input, firstPart);
	const secondTime = file.secondPart && performance.now();

	console.log(
		"First part:",
		firstPart,
		`${firstTime - start}ms\nSecond part:`,
		file.secondPart ? secondPart : "N/A",
		secondTime !== undefined ? `${secondTime - firstTime}ms\n` : "",
		secondTime !== undefined ? `Total: ${secondTime - start}ms` : ""
	);
}
