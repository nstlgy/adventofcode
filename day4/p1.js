const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const data = input.split("\n").map((e) => e.split(""));

let count = 0;
let ROWS = data.length;
let COLS = data[0].length;

// const regex = /XMAS/;
// const path = new Set(); //path.add(element) No Duplicates

const directions = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [1, 1], // diagonal down-right
  [1, -1], // diagonal down-left
  [-1, 1], // diagonal up-right
  [-1, -1], // diagonal up-left
];

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (data[i][j] === "X") {
      for (let [di, dj] of directions) {
        let i1 = i + di,
          j1 = j + dj;
        let i2 = i + 2 * di,
          j2 = j + 2 * dj;
        let i3 = i + 3 * di,
          j3 = j + 3 * dj;

        if (
          i1 >= 0 &&
          i1 < ROWS &&
          j1 >= 0 &&
          j1 < COLS &&
          i2 >= 0 &&
          i2 < ROWS &&
          j2 >= 0 &&
          j2 < COLS &&
          i3 >= 0 &&
          i3 < ROWS &&
          j3 >= 0 &&
          j3 < COLS &&
          data[i1][j1] === "M" &&
          data[i2][j2] === "A" &&
          data[i3][j3] === "S"
        ) {
          count++;
        }
      }
    }
  }
}

console.log(count);
