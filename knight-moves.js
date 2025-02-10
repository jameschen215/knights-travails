// The dimension of the chessboard
const ROW = 8;
const COL = 8;

// List of all possible knight moves, represented as (row change, column change)
const MOVES = [
	[-2, -1], // Move 2 up, 1 left
	[-2, 1], // Move 2 up, 1 right
	[-1, -2], // Move 1 up, 2 left
	[-1, 2], // Move 1 up, 2 right
	[1, -2], // Move 1 down, 2 left
	[1, 2], // Move 1 down, 2 right
	[2, -1], // Move 2 down, 1 left
	[2, 1], // Move 2 down, 1 right
];

// Returns the valid neighbors a knight can move to from a given position
function getValidNeighbors([row, col]) {
	// Use the MOVES array to calculate all possible
	// positions the knight can move to
	// Filter out the invalid positions (those outside the board)
	return MOVES.map(([dr, dc]) => [row + dr, col + dc]).filter(
		([row, col]) => row >= 0 && row < ROW && col >= 0 && col < COL
	);
}

// Helper function to trace the path from the destination to the starting point
function formPath(steps, destination) {
	const path = [];
	let current = destination;

	// Backtrack from the destination to the starting point, following the steps
	while (current !== null) {
		path.push(current);

		// Get the previous node from the steps object
		current = steps[String(current)];
	}

	// Reverse the path because we traced it backward
	return path.reverse();
}

// Function to perform BFS and find the shortest path
// from the 'from' position to the 'to' position
function findSteps(from, to) {
	const queue = [from]; // Initialize the queue with the starting position
	const steps = { [from]: null }; // Track the path using the steps object
	const visited = new Set([String(from)]); // Keep track of visited positions

	// Process the queue in BFS order
	while (queue.length !== 0) {
		const current = queue.shift(); // Dequeue the first element in the queue

		// If we have reached the destination, backtrack the path and return it
		if (String(current) === String(to)) {
			return formPath(steps, to);
		}

		// For each valid neighboring position
		// If it hasn't been visited, add it to the queue
		for (let neighbor of getValidNeighbors(current)) {
			// Convert the neighbor to a string for easy comparison
			const key = String(neighbor);

			if (!visited.has(key)) {
				// Mark the neighbor as visited
				visited.add(key);
				// Store the current position as the previous position for backtracking
				steps[key] = current;
				// Add the neighbor to the queue
				queue.push(neighbor);
			}
		}
	}

	// If there's no path, return an empty array
	return [];
}

// Check if the given coordinate is within the bounds of the chessboard
function isValidCheck(coordinate) {
	return coordinate.every((num) => num >= 0 && num < ROW);
}

// Print the shortest path from the start to the destination
function printPath(path) {
	console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
	path.forEach((pos) => console.log(pos));
}

// The main function that calculates the shortest path for the knight
export function knightMoves(from, to) {
	if (!isValidCheck(from) || !isValidCheck(to)) {
		console.log('Start or end point out of the board.');
		return;
	}

	if (String(from) === String(to)) {
		console.log('Start or end point are the same one.');
		return;
	}

	const path = findSteps(from, to);

	printPath(path);
}
