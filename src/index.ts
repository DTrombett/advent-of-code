/* eslint-disable n/no-unpublished-import */
import "dotenv/config";
import { error, log } from "node:console";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { argv, env, stdin, stdout } from "node:process";
import { setTimeout } from "node:timers/promises";
import { build } from "tsup";
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { createInterface } from "node:readline/promises";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default: ExecuteFunction; iterations?: number };

const production = env.NODE_ENV === "production";
const run = async (file: DayFile, input: string) => {
	const iterations = file.iterations ?? (production ? 100 : 1);
	let result;
	let time = 0;

	for (let i = 0; i < iterations; i++) {
		await setTimeout();
		const now = performance.now();

		result = await file.default(input);
		time += performance.now() - now;
	}
	return { result, time: time / iterations };
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

await build({
	bundle: true,
	clean: false,
	config: "tsup.config.ts",
	watch: !production,
	entry: part
		? { [part]: join(folder, `${part}.ts`) }
		: {
				"1": join(folder, "1.ts"),
				"2": join(folder, "2.ts"),
			},
	onSuccess: async () => {
		await setTimeout();
		try {
			const now = Date.now();

			if (part) {
				const file: DayFile = await import(
					`./${part}.js${production ? "" : `?${now}`}`
				);
				const { result, time } = await run(file, input);

				log("Result:", result, `\n${time}ms`);
				return;
			}
			const [first, second]: [DayFile, DayFile] = await Promise.all([
				import(`./1.js${production ? "" : `?${now}`}`),
				import(`./2.js${production ? "" : `?${now}`}`),
			]);
			const firstResult = await run(first, input);
			const secondResult = await run(second, input);

			log(
				"First part:",
				firstResult.result,
				`(${firstResult.time}ms)`,
				"\nSecond part:",
				secondResult.result,
				`(${secondResult.time}ms)`,
				`\n\tTotal: ${firstResult.time + secondResult.time}ms`,
			);
		} catch (err) {
			error(err);
		}
	},
});
