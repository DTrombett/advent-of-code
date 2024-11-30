import { log } from "node:console";
import { getInput, time } from "../utils.js";

const input = getInput("2022/11");
const start = performance.now();

const monkeyData = input.split("\n\n").map((m) => {
	const [, startingItems, operation, test, ifTrue, ifFalse] =
		m.split(/\n.*: /gu);

	return {
		items: startingItems.split(", ").map((n) => Number(n)),
		operation: operation.slice(6),
		test: Number(test.split(" ").at(-1)),
		ifTrue: Number(ifTrue.split(" ").at(-1)),
		ifFalse: Number(ifFalse.split(" ").at(-1)),
		inspected: 0,
	};
});
const check = monkeyData.reduce((a, b) => a * b.test, 1);

for (let i = 1; i <= 10_000; i++)
	for (const monkey of monkeyData) {
		for (const item of monkey.items) {
			const worry =
				// eslint-disable-next-line no-eval
				(0, eval)(monkey.operation.replaceAll("old", item.toString())) % check;

			monkeyData[
				monkey[worry % monkey.test === 0 ? "ifTrue" : "ifFalse"]
			].items.push(worry);
			monkey.inspected++;
		}
		monkey.items.length = 0;
	}
const business =
	monkeyData.sort((a, b) => b.inspected - a.inspected)[0].inspected *
	monkeyData[1].inspected;
const end = performance.now();

log(business, time(start, end));
