const splitter = /\n\n/u;
const matcher = /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/gu;
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
enum Instruction {
	L,
	R,
}

const secondPart = (input: string) => {
	const [instructions, maps] = input.split(splitter);
	const map = new Map<string, string[]>();
	const names: string[] = [];
	const currents: string[][] = [];
	const lengths: number[] = [];

	for (const match of maps.matchAll(matcher)) {
		const value = [match[2], match[3]];

		map.set(match[1], value);
		if (match[1].endsWith("A")) {
			names.push(match[1]);
			currents.push(value);
		}
	}
	for (let j = 0; j < names.length; j++) {
		let i = 0;

		do {
			names[j] =
				currents[j][
					Instruction[
						instructions[i % instructions.length] as keyof typeof Instruction
					]
				];
			currents[j] = map.get(names[j])!;
			i++;
		} while (names[j].at(-1) !== "Z");
		lengths.push(i);
	}
	return lengths.reduce(lcm);
};

export default secondPart;
