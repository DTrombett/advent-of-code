import { readFileSync } from "node:fs";

export const getInput = (day: `${number}/${number}`) =>
	readFileSync(`./inputs/${day}`, { encoding: "utf-8" });

export const time = (start: number, end: number) => `${end - start}ms`;
