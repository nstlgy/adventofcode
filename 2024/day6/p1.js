import fs from "node:fs";
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

let position = { x: 0, y: 0 };
let direction = 0;
const positionsVisited = new Set();

const startRow = grid.findIndex((row) => row.includes("^"));
if (startRow !== -1) {
  const startCol = grid[startRow].indexOf("^");
  position = { x: startRow, y: startCol };
}

grid[position.x][position.y] = ".";

while (true) {
  let nextX = position.x + directions[direction][0];
  let nextY = position.y + directions[direction][1];

  if (!(nextX >= 0 && nextX < ROWS && nextY >= 0 && nextY < COLS)) {
    break;
  }

  if (grid[nextX][nextY] === ".") {
    position.x = nextX;
    position.y = nextY;
    positionsVisited.add(`${position.x},${position.y}`);
    console.log(position);
  } else {
    direction = (direction + 1) % 4;
  }
}

console.log("Total Positions Visited:", positionsVisited.size);
console.log("Visited Positions:", [...positionsVisited]);
