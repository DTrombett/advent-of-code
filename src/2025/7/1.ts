export default (input: string) => {
	let pos: ReadonlySet<number> = new Set([input.indexOf("S")]);
	const lineLength = input.indexOf("\n") + 1;
	let split = 0;

	for (let i = lineLength; input[i]; i += lineLength) {
		const newPos = new Set<number>();

		for (const el of pos)
			if (input[i + el] === "^") {
				newPos.add(el - 1);
				newPos.add(el + 1);
				split++;
			} else newPos.add(el);
		pos = newPos;
	}
	return split;
};
