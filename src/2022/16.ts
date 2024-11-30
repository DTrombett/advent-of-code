import { log } from "node:console";
import { getInput, time } from "../utils.js";

type Valve = {
	name: string;
	opened: boolean;
	pressure: number;
	tunnels: Valve[];
	tunnelsString: string[];
};
const input = getInput("2022/16");
const start = performance.now();

const valves: Valve[] = input.split("\n").map((line) => {
	const [name, pressure, ...tunnelsString] = line.match(/\d+|[A-Z]{2}/gu)!;

	return {
		name,
		opened: false,
		pressure: Number(pressure),
		tunnels: [],
		tunnelsString,
	};
});
let [current] = valves;
let increasing = 0;
let pressure = 0;

for (const valve of valves)
	valve.tunnels = valve.tunnelsString
		.map((v) => valves.find(({ name }) => name === v)!)
		.sort((a, b) => b.pressure - a.pressure);
for (let min = 1; min <= 30; min++) {
	pressure += increasing;
	if (current.opened || !current.pressure)
		current =
			current.tunnels.find((t) => !t.opened) ??
			current.tunnels.find((t) => t.tunnels.find((n) => !n.opened)) ??
			current.tunnels[0];
	else {
		increasing += current.pressure;
		current.opened = true;
	}
}
const end = performance.now();

log(pressure, time(start, end));
