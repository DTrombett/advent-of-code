/* eslint-disable n/no-unpublished-import */
import "dotenv/config";
import { error, log } from "node:console";
import { readFile, watch } from "node:fs/promises";
import { join } from "node:path";
import { argv, stdin, stdout } from "node:process";
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { createInterface } from "node:readline/promises";
import { pathToFileURL } from "node:url";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default: ExecuteFunction; iterations?: number };

const run = async (file: DayFile, input: string) => {
	const now = performance.now();

	return { result: await file.default(input), time: performance.now() - now };
};
const rl = createInterface({
	input: stdin,
	output: stdout,
});
let [year, day, part] = argv.slice(2).flatMap((a) => a.split("/"));

year ??= await rl.question("Year: ");
day ??= await rl.question("Day: ");
part ??= "";
rl.close();
const folder = `src/${year}/${day}`;
const input = (
	await readFile(join("inputs", year, day), { encoding: "utf-8" })
).trimEnd();
const paths = [
	pathToFileURL(join(folder, "1.ts")),
	pathToFileURL(join(folder, "2.ts")),
] as const;
const partNumber = Number(part) - 1;

// eslint-disable-next-line no-empty-pattern
for await (const {} of watch(part ? join(folder, `${part}.ts`) : folder))
	try {
		const now = Date.now().toString();

		for (const path of paths) path.hash = now;
		if (part) {
			const file: DayFile = await import(paths[partNumber]!.href);
			const { result, time } = await run(file, input);

			log("Result:", result, "\n", time, "ms");
			continue;
		}
		const [first, second] = (await Promise.all(
			paths.map((p) => import(p.href)),
		)) as [DayFile, DayFile];
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
	} catch (err) {
		error(err);
	}
