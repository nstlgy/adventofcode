const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const grid = input.split("\n").map((e) => e.split(""));

let count = 0;
const rows = grid.length;
const cols = grid[0].length;
let res = [];
const dirs = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (grid[i][j] === "A") {
      let temp = [];
      for (let [di, dj] of dirs) {
        let ni = i + di;
        let nj = j + dj;
        temp.push(grid[ni][nj]);
      }
      res.push(temp);
    }
  }
}

const strs = res.map((e) => e.join(""));

for (let str of strs) {
  if (str === "MMSS" || str === "MSSM" || str === "SSMM" || str === "SMMS") {
    count++;
  }
}
console.log(count);
