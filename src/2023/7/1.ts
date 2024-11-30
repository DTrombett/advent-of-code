enum ResultType {
	HighCard,
	OnePair,
	TwoPair,
	Three,
	Full,
	Four,
	Five,
}
type Result = {
	type: ResultType;
	cards: number[];
};

const Card: Record<string, number> = {
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	T: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};
const points: Record<string, Result | undefined> = {};
const bid: Record<string, number> = {};

const compareCards = (a: number[], b: number[]) => {
	for (let i = 0; i < a.length; i++) {
		if (a[i] > b[i]) return 1;
		if (b[i] > a[i]) return -1;
	}
	return 0;
};
const resolvePoints = (hand: string): Result => {
	const result: Partial<{
		four: number;
		three: number;
		pair: number[];
		high: number;
	}> = {};
	const cards: number[] = [];
	const resolvedCards: number[] = [];

	bid[hand] = parseInt(hand.slice(6), 10);
	for (const char of hand) {
		if (char === " ") break;
		const resolved = Card[char];

		resolvedCards.push(resolved);
		if (cards[resolved])
			switch (cards[resolved]++) {
				case 1:
					if (result.pair) result.pair.push(resolved);
					else result.pair = [resolved];
					break;
				case 2:
					result.pair = result.pair!.filter((c) => c !== resolved);
					result.three = resolved;
					break;
				case 3:
					result.four = result.three;
					result.three = undefined;
					break;
				case 4:
					return { type: ResultType.Five, cards: resolvedCards };
				default:
			}
		else {
			cards[resolved] = 1;
			if (resolved > result.high!) result.high = resolved;
		}
	}
	if (result.four !== undefined)
		return { type: ResultType.Four, cards: resolvedCards };
	if (result.three !== undefined)
		return {
			type: ResultType[result.pair!.length ? "Full" : "Three"],
			cards: resolvedCards,
		};
	if (result.pair) {
		if (result.pair.length === 1)
			return { type: ResultType.OnePair, cards: resolvedCards };
		if (result.pair.length === 2)
			return {
				type: ResultType.TwoPair,
				cards: resolvedCards,
			};
	}
	return { type: ResultType.HighCard, cards: resolvedCards };
};
const compareHands = (a: string, b: string) => {
	points[a] ??= resolvePoints(a);
	points[b] ??= resolvePoints(b);
	return (
		points[a].type - points[b].type ||
		compareCards(points[a].cards, points[b].cards)
	);
};

const firstPart = (input: string) =>
	input
		.split("\n")
		.sort(compareHands)
		.reduce((sum, line, i) => sum + bid[line] * (i + 1), 0);

export default firstPart;
