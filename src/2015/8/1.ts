const firstPart = (input: string) =>
	input.split("\n").reduce(
		// eslint-disable-next-line no-eval
		(sum, string) => sum + string.length - (eval(string) as string).length,
		0,
	);

export default firstPart;
