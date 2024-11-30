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
	J: 0,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	T: 10,
	Q: 11,
	K: 12,
	A: 13,
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
	}> & { jolly: number } = {
		jolly: 0,
	};
	const cards: number[] = [];
	const resolvedCards: number[] = [];

	bid[hand] = parseInt(hand.slice(6), 10);
	for (const char of hand) {
		if (char === " ") break;
		const resolved = Card[char];

		resolvedCards.push(resolved);
		if (char === "J") result.jolly++;
		else if (cards[resolved])
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
		return {
			type: result.jolly ? ResultType.Five : ResultType.Four,
			cards: resolvedCards,
		};
	if (result.three !== undefined)
		return {
			type: result.pair!.length
				? ResultType.Full
				: result.jolly === 0
					? ResultType.Three
					: result.jolly === 1
						? ResultType.Four
						: ResultType.Five,
			cards: resolvedCards,
		};
	if (result.pair) {
		if (result.pair.length === 1)
			return {
				type:
					result.jolly === 0
						? ResultType.OnePair
						: result.jolly === 1
							? ResultType.Three
							: result.jolly === 2
								? ResultType.Four
								: ResultType.Five,
				cards: resolvedCards,
			};
		if (result.pair.length === 2)
			return {
				type: result.jolly ? ResultType.Full : ResultType.TwoPair,
				cards: resolvedCards,
			};
	}
	if (result.jolly === 0)
		return { type: ResultType.HighCard, cards: resolvedCards };
	if (result.jolly === 1)
		return { type: ResultType.OnePair, cards: resolvedCards };
	if (result.jolly === 2)
		return { type: ResultType.Three, cards: resolvedCards };
	if (result.jolly === 3)
		return { type: ResultType.Four, cards: resolvedCards };
	return { type: ResultType.Five, cards: resolvedCards };
};
const compareHands = (a: string, b: string) => {
	points[a] ??= resolvePoints(a);
	points[b] ??= resolvePoints(b);
	return (
		points[a].type - points[b].type ||
		compareCards(points[a].cards, points[b].cards)
	);
};

const secondPart = (input: string) =>
	input
		.split("\n")
		.sort(compareHands)
		.reduce((sum, line, i) => sum + bid[line] * (i + 1), 0);

export default secondPart;
