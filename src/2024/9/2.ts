const sum = (n: number) => (n * (n + 1)) / 2;

const secondPart = (input: string) => {
	const blocks = input
		.split("")
		.map((b, i) => ({ id: i % 2 ? 0 : i / 2, count: Number(b) }));

	for (let i = blocks.length - 1; i > 0; i--) {
		const block = blocks[i]!;

		if (!block.id) continue;
		for (let j = 1; j < i; j++)
			if (!blocks[j]!.id && blocks[j]!.count >= block.count) {
				blocks.splice(j, 1, block, {
					id: 0,
					count: blocks[j]!.count - block.count,
				});
				blocks[i + 1] = { id: 0, count: block.count };
				break;
			}
	}
	return blocks.reduce<readonly [number, number]>(
		(r, b) =>
			[
				r[0] + (sum(r[1] + b.count - 1) - sum(r[1] - 1)) * b.id,
				r[1] + b.count,
			] as const,
		[0, 0],
	)[0];
};

export default secondPart;
