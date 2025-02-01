import fs from "node:fs";

function main() {
  const data = fs.readFileSync("input.txt", "utf8").trim();
  const grid = data.split("\n").map((row) => row.split(""));
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const directions = [
    [-1, 0], // UP
    [0, 1], // RIGHT
    [1, 0], // DOWN
    [0, -1], // LEFT
  ];

  let startRow = grid.findIndex((row) => row.includes("^"));
  let startCol = grid[startRow].indexOf("^");

  const startPosition = { x: startRow, y: startCol };
  grid[startPosition.x][startPosition.y] = ".";

  let count = 0;

  function checkInfiniteLoop(grid, initialPosition, initialDirection) {
    const visitedStates = new Set();
    let position = { ...initialPosition };
    let direction = initialDirection;

    while (true) {
      const state = `${position.x},${position.y},${direction}`;
      if (visitedStates.has(state)) {
        return true;
      }
      visitedStates.add(state);

      let nextX = position.x + directions[direction][0];
      let nextY = position.y + directions[direction][1];

      // Check if out of bounds
      if (nextX < 0 || nextX >= ROWS || nextY < 0 || nextY >= COLS) {
        return false;
      }

      if (grid[nextX][nextY] === ".") {
        position.x = nextX;
        position.y = nextY;
      } else {
        direction = (direction + 1) % 4;
      }
    }
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (grid[i][j] !== ".") {
        continue;
      }

      grid[i][j] = "#";

      if (checkInfiniteLoop(grid, startPosition, 0)) {
        count++;
      }

      grid[i][j] = ".";
    }
  }

  console.log(count);
}

console.time("main");
main();
console.timeEnd("main");
