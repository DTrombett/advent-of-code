import { log } from "node:console";
import { readFile } from "node:fs/promises";
import { constants, setPriority } from "node:os";
import { join } from "node:path";
import { argv, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { setTimeout } from "node:timers/promises";
import { pathToFileURL } from "node:url";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default: ExecuteFunction; iterations?: number };

const run = async (file: DayFile, input: string) => {
	const iterations = file.iterations ?? 10;
	let result;
	let time = 0;

	for (let i = 0; i < iterations; i++) {
		await setTimeout();
		const utilization = performance.eventLoopUtilization();

		result = await file.default(input);
		time += performance.eventLoopUtilization().active - utilization.active;
	}
	return { result, time: time / iterations };
};
const rl = createInterface({
	input: stdin,
	output: stdout,
});
let [year, day, part] = argv.slice(2).flatMap((a) => a.split("/"));

new PerformanceObserver((list) => {
	log(
		list
			.getEntries()
			.map((e) => `${e.name}: ${e.duration}ms`)
			.join("\n"),
	);
	performance.clearMarks();
	performance.clearMeasures();
}).observe({ entryTypes: ["function"] });
setPriority(constants.priority.PRIORITY_HIGHEST);
year ??= await rl.question("Year: ");
day ??= await rl.question("Day: ");
part ??= "";
rl.close();
const folder = `src/${year}/${day}`;
let input = await readFile(join("inputs", year, `${day}.txt`), {
	encoding: "utf-8",
});

if (input.endsWith("\n")) input = input.slice(0, -1);
if (part) {
	const file: DayFile = await import(
		pathToFileURL(join(folder, `${part}.ts`)).href
	);
	const { result, time } = await run(file, input);

	log("Result:", result, "\n", time, "ms");
} else {
	const [first, second]: [DayFile, DayFile] = await Promise.all([
		import(pathToFileURL(join(folder, "1.ts")).href),
		import(pathToFileURL(join(folder, "2.ts")).href),
	]);
	const firstResult = await run(first, input);
	const secondResult = await run(second, input);

	log(
		"First part:",
		firstResult.result,
		"(",
		firstResult.time,
		"ms)",
		"\nSecond part:",
		secondResult.result,
		"(",
		secondResult.time,
		"ms)\n\tTotal:",
		firstResult.time + secondResult.time,
		"ms",
	);
}
