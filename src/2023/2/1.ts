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

const firstPart = (input: string) =>
	input.split("\n").reduce((sum, string) => {
		const [, n, ...data] = string.split(" ");

		for (let i = 0; i < data.length; i += 2)
			if (parseInt(data[i], 10) > colors[resolvedColors[data[i + 1]]])
				return sum;
		return sum + parseInt(n, 10);
	}, 0);

export default firstPart;
