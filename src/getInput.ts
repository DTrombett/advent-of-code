import { readFileSync } from "node:fs";

export const getInput = (day: `${number}/${number}`) =>
	readFileSync(`./inputs/${day}`, { encoding: "utf-8" });
