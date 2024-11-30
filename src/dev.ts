/* eslint-disable n/no-unpublished-import */
import { log } from "node:console";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { argv, stdin, stdout } from "node:process";
import { build } from "tsup";
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { createInterface } from "node:readline/promises";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default: ExecuteFunction };

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
	clean: false,
	config: "tsup.config.ts",
	watch: folder,
	entry: part
		? { [part]: join(folder, `${part}.ts`) }
		: {
				"1": join(folder, "1.ts"),
				"2": join(folder, "2.ts"),
		  },
	onSuccess: async () => {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		setTimeout(async () => {
			if (part) {
				const { default: func }: DayFile = await import(
					`./${part}.js?${Date.now()}`
				);
				const now = performance.now();

				log("Result:", await func(input), `\n${performance.now() - now}ms`);
				return;
			}
			const [first, second] = (
				await Promise.all([
					import(`./1.js?${Date.now()}`),
					import(`./2.js?${Date.now()}`),
				])
			).map((f: DayFile) => f.default);
			const start = performance.now();
			const firstResult = await first!(input);
			const firstTime = performance.now();
			const secondResult = await second!(input);
			const secondTime = performance.now();

			log(
				"First part:",
				firstResult,
				`(${firstTime - start}ms)`,
				"\nSecond part:",
				secondResult,
				`(${secondTime - firstTime}ms)`,
				`\n\tTotal: ${secondTime - start}ms`,
			);
		});
	},
});
