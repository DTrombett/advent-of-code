export default (input: string) => {
	let total = 0;
	const lastN = input.lastIndexOf("\n");
	const lastLine = input.slice(lastN + 1);
	const lineLength = lastLine.length + 1;

	input = input.slice(0, lastN);
	for (let i = 0; i < lastLine.length; i++) {
		const op = lastLine[i];
		if (op !== "+" && op !== "*") throw new Error(`Invalid operation ${op}`);
		let solution = op === "*" ? 1 : 0;

		for (; lastLine[i + 1] === " " || (lastLine[i] && !lastLine[i + 1]); i++) {
			let n = "";

			for (let j = 0; ; j++) {
				const char = input[i + lineLength * j];

				if (!char) break;
				if (char !== " ") n += char;
			}
			if (op === "*") solution *= +n;
			else solution += +n;
		}
		total += solution;
	}
	return total;
};
