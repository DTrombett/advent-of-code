import { readFileSync } from "node:fs";

/** @deprecated */
export const getInput = (day: `${number}/${number}`) =>
	readFileSync(`./inputs/${day}`, { encoding: "utf-8" });

/** @deprecated */
export const time = (start: number, end: number) => `${end - start}ms`;
