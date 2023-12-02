const colors = {
	red: 12,
	green: 13,
	blue: 14,
} as const;
const resolvedColors: Record<string, keyof typeof colors> = {};

for (const c of Object.keys(colors))
	resolvedColors[`${c},`] =
		resolvedColors[`${c};`] =
		resolvedColors[c] =
			c as keyof typeof colors;

export const firstPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const [, n, ...data] = string.split(" ");

		for (let i = 0; i < data.length; i += 2)
			if (parseInt(data[i]) > colors[resolvedColors[data[i + 1]]]) return sum;
		return sum + parseInt(n);
	}, 0);

export const secondPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const [, , ...data] = string.split(" ");
		const highest = {
			red: 0,
			blue: 0,
			green: 0,
		};

		for (let i = 0; i < data.length; i += 2) {
			const resolved = resolvedColors[data[i + 1]];
			const n = parseInt(data[i]);

			if (n > highest[resolved]) highest[resolved] = n;
		}
		return sum + highest["blue"] * highest["green"] * highest["red"];
	}, 0);
