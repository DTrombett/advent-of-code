const regexp = /(.*) -> (\w+)/gu;

const resolveResult: Record<string, (a: number, b: number) => number> = {
	AND: (a, b) => a & b,
	OR: (a, b) => a | b,
	LSHIFT: (a, b) => a << b,
	RSHIFT: (a, b) => a >>> b,
};

const secondPart = (input: string) => {
	const operations = new Map<string, string>();
	const results = new Map<string, number>();
	const resolveSignal = (signal: string) => {
		let result: number | undefined = Number(signal);

		if (Number.isNaN(result)) {
			result = results.get(signal);
			if (!result)
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				results.set(signal, (result = execute(operations.get(signal)!)));
		}
		return result;
	};
	const execute = (op: string): number => {
		if (!op.includes(" ")) return resolveSignal(op);
		if (op.startsWith("NOT")) return ~resolveSignal(op.slice(4)) & 0xffff;
		const [a, o, b] = op.split(" ");

		return resolveResult[o!]!(resolveSignal(a!), resolveSignal(b!));
	};

	for (const [, op, r] of input.matchAll(regexp)) operations.set(r!, op!);
	operations.set("b", resolveSignal("a").toString());
	results.clear();
	return resolveSignal("a");
};

export default secondPart;
