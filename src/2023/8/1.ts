const splitter = /\n\n/;
const matcher = /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/g;
enum Instruction {
	L,
	R,
}

const firstPart = (input: string) => {
	const [instructions, maps] = input.split(splitter);
	const map = new Map<string, string[]>();

	for (const match of maps.matchAll(matcher))
		map.set(match[1], [match[2], match[3]]);
	let name = "AAA";
	let current = map.get(name);
	let i = 0;

	do {
		name =
			current![
				Instruction[
					instructions[i % instructions.length] as keyof typeof Instruction
				]
			];
		current = map.get(name);
		i++;
	} while (name !== "ZZZ");
	return i;
};

export default firstPart;
