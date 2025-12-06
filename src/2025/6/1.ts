export default (input: string) => {
	let total = 0;
	const lines = input.split("\n").map((l) => l.trim().split(/\s+/g));
	const op = lines.pop()!;

	for (let i = 0; i < lines[0]!.length; i++) {
		let sol;

		if (op[i] === "*") sol = lines.reduce((t, l) => t * +l[i]!, 1);
		else if (op[i] === "+") sol = lines.reduce((t, l) => t + +l[i]!, 0);
		else throw new Error(`Invalid operation ${op[i]}`);
		total += sol;
	}
	return total;
};
