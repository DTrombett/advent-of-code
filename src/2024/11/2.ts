const BLINKS = 75;

const cache = new Map<bigint, number>();

const calc = (blinks: number, x: number) => {
	const key = (BigInt(blinks) << 53n) | BigInt(x);
	let value = cache.get(key);

	if (!value) {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		value = calcNumbers(blinks, x);
		cache.set(key, value);
	}
	return value;
};
const calcNumbers = (blinks: number, x: number): number => {
	if (blinks === 0) return 1;
	blinks--;
	if (x === 0) return calc(blinks, 1);
	let n = x === 0 ? 1 : Math.floor(Math.log10(x)) + 1;

	if (n % 2 === 0) {
		n /= 2;
		return calc(blinks, Math.floor(x / 10 ** n)) + calc(blinks, x % 10 ** n);
	}
	return calc(blinks, x * 2024);
};

const secondPart = (input: string) =>
	input.split(" ").reduce((sum, stone) => sum + calc(BLINKS, Number(stone)), 0);

export default secondPart;
