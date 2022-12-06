import { getInput } from "../getInput";

const input = getInput("2022/6");
const chars = 14;
let result = 0;

for (let i = chars; i < input.length; i++) {
	const m = input.slice(i - chars, i);

	if ([...m].every((c, j) => !m.slice(0, j).includes(c))) {
		result = i;
		break;
	}
}
console.log(result);
