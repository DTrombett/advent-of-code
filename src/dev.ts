import { error, log } from "node:console";
import { readFile, watch } from "node:fs/promises";
import { constants, setPriority } from "node:os";
import { join } from "node:path";
import { argv, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { pathToFileURL } from "node:url";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default: ExecuteFunction; iterations?: number };

// eslint-disable-next-line @typescript-eslint/require-await
const run = async (file: DayFile, input: string) =>
	performance.timerify(file.default)(input);
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
const paths = [
	pathToFileURL(join(folder, "1.ts")),
	pathToFileURL(join(folder, "2.ts")),
] as const;
const partNumber = Number(part) - 1;

if (input.endsWith("\n")) input = input.slice(0, -1);
for await (const event of watch(part ? join(folder, `${part}.ts`) : folder))
	try {
		const now = Date.now().toString();

		for (const path of paths) path.hash = now;
		log(`${event.filename} ${event.eventType}d`);
		if (part) {
			const file: DayFile = await import(paths[partNumber]!.href);
			const result = await run(file, input);

			log("Result:", result);
			continue;
		}
		const [first, second] = (await Promise.all(
			paths.map((p) => import(p.href)),
		)) as [DayFile, DayFile];
		const firstResult = await run(first, input);
		const secondResult = await run(second, input);

		log("First part:", firstResult, "\nSecond part:", secondResult);
	} catch (err) {
		error(err);
	}
