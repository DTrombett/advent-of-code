const push = (pos: [number, number][], el: number, c: number) => {
	const found = pos.find(([v]) => v === el);

	if (found) found[1] += c;
	else pos.push([el, c]);
};

export default (input: string) => {
	let pos: ReadonlyArray<[number, number]> = [[input.indexOf("S"), 1]];
	const lineLength = input.indexOf("\n") + 1;

	for (let i = lineLength; input[i]; i += lineLength) {
		const newPos: [number, number][] = [];

		for (const [el, c] of pos)
			if (input[i + el] === "^") {
				push(newPos, el - 1, c);
				push(newPos, el + 1, c);
			} else push(newPos, el, c);
		pos = newPos;
	}
	return pos.reduce((c, [, v]) => c + v, 0);
};
