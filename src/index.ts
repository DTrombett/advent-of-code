import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { argv } from "node:process";
import { build } from "tsup";

export type ExecuteFunction = (input: string) => unknown;
export type DayFile = { default?: ExecuteFunction };

if (argv[3] && argv[3] !== "1" && argv[3] !== "2")
	throw new TypeError("Invalid day number provided");
const folder = join("src", argv[2]);
const input = await readFile(`./inputs/${argv[2]}`, { encoding: "utf-8" });

await build({
	config: "tsup.config.ts",
	clean: false,
	entry: argv[3]
		? { [join(argv[2], `${argv[3]}`)]: join(folder, `${argv[3]}.ts`) }
		: {
				[join(argv[2], "1")]: join(folder, "1.ts"),
				[join(argv[2], "2")]: join(folder, "2.ts"),
		  },
	watch: true,
	onSuccess: async () => {
		const [{ default: firstPart }, { default: secondPart }]: DayFile[] =
			await Promise.all([
				(!argv[3] || argv[3] === "1") &&
					import(`./${argv[2]}/1.js?${Date.now()}`),
				(!argv[3] || argv[3] === "2") &&
					import(`./${argv[2]}/2.js?${Date.now()}`),
			]);
		const start = firstPart && performance.now();
		const firstResult = await firstPart?.(input);
		const firstTime = performance.now();
		const secondResult = await secondPart?.(input);
		const secondTime = secondPart && performance.now();

		console.log(
			"First part:",
			firstPart ? firstResult : "N/A",
			start === undefined ? "" : `${firstTime - start}ms`,
			"\nSecond part:",
			secondPart ? secondResult : "N/A",
			secondTime === undefined ? "" : `${secondTime - firstTime}ms`,
			secondTime === undefined || start === undefined
				? ""
				: `\n\tTotal: ${secondTime - start}ms`
		);
	},
});
