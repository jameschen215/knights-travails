const ROW = 8;
const COL = 8;

const MOVES = [
	[-2, -1],
	[-2, 1],
	[-1, -2],
	[-1, 2],
	[1, -2],
	[1, 2],
	[2, -1],
	[2, 1],
];

const graph = initiateGraph();

function divMod(a, b = ROW) {
	return [Math.floor(a / b), a % b];
}

function getIndex(row, col) {
	return row * ROW + col;
}

export function initiateGraph() {
	const graph = [];
	const total = ROW * COL;

	for (let i = 0; i < total; i++) {
		const [row, col] = divMod(i);
		graph.push([]);

		for (let [dr, dc] of MOVES) {
			const r = row + dr;
			const c = col + dc;
			if (r >= 0 && r < ROW && c >= 0 && c < COL) {
				graph[i].push(getIndex(r, c));
			}
		}
	}

	return graph;
}

function findSteps(from, to) {
	const queue = [];
	const steps = {};
	const visited = new Set();

	queue.push(from);
	visited.add(from);
	steps[from] = null;

	while (queue.length !== 0) {
		const current = queue.shift();

		if (current === to) {
			return formSteps(steps, to);
		}

		for (let neighbor of graph[current]) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor);
				// In steps, every neighbor of the current node points to the current one
				// You can find the start from the end step by step
				steps[neighbor] = current;

				// Push the current node's all neighbors into the queue
				queue.push(neighbor);
			}
		}
	}

	return [];
}

function formSteps(steps, to) {
	const path = [];
	let current = to;

	while (current !== null) {
		path.push(current);
		current = steps[current];
	}

	return path.reverse().map((index) => divMod(index));
}

function printSteps(steps) {
	console.log(`You made it in ${steps.length - 1} moves! Here's your path:`);

	steps.forEach((node) => {
		console.log(node);
	});
}

function checkOutOfBoard(numbers) {
	return numbers.some((num) => num < 0 || num >= ROW);
}

export function knightMoves(from, to) {
	if (checkOutOfBoard([...from, ...to])) {
		console.log('Start or end point out of the board.');
		return;
	}

	const startPoint = getIndex(from[0], from[1]);
	const endPoint = getIndex(to[0], to[1]);

	const steps = findSteps(startPoint, endPoint);

	printSteps(steps);
}
