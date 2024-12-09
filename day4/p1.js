const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const data = input.split("\n").map((e) => e.split(""));

let count = 0;
let ROWS = data.length;
let COLS = data[0].length;

const regex = /XMAS/;
// const path = new Set(); //path.add(element) No Duplicates

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (data[i][j] === "X") {
      // Check right
      if (
        j + 3 < COLS &&
        data[i][j + 1] === "M" &&
        data[i][j + 2] === "A" &&
        data[i][j + 3] === "S"
      ) {
        count++;
      }

      // Check left
      if (
        j - 3 >= 0 &&
        data[i][j - 1] === "M" &&
        data[i][j - 2] === "A" &&
        data[i][j - 3] === "S"
      ) {
        count++;
      }

      // Check down
      if (
        i + 3 < ROWS &&
        data[i + 1][j] === "M" &&
        data[i + 2][j] === "A" &&
        data[i + 3][j] === "S"
      ) {
        count++;
      }

      // Check up
      if (
        i - 3 >= 0 &&
        data[i - 1][j] === "M" &&
        data[i - 2][j] === "A" &&
        data[i - 3][j] === "S"
      ) {
        count++;
      }
      // Check diagonal down-right
      if (
        i + 3 < ROWS &&
        j + 3 < COLS &&
        data[i + 1][j + 1] === "M" &&
        data[i + 2][j + 2] === "A" &&
        data[i + 3][j + 3] === "S"
      ) {
        count++;
      }

      // Check diagonal down-left
      if (
        i + 3 < ROWS &&
        j - 3 >= 0 &&
        data[i + 1][j - 1] === "M" &&
        data[i + 2][j - 2] === "A" &&
        data[i + 3][j - 3] === "S"
      ) {
        count++;
      }

      // Check diagonal up-right
      if (
        i - 3 >= 0 &&
        j + 3 < COLS &&
        data[i - 1][j + 1] === "M" &&
        data[i - 2][j + 2] === "A" &&
        data[i - 3][j + 3] === "S"
      ) {
        count++;
      }

      // Check diagonal up-left
      if (
        i - 3 >= 0 &&
        j - 3 >= 0 &&
        data[i - 1][j - 1] === "M" &&
        data[i - 2][j - 2] === "A" &&
        data[i - 3][j - 3] === "S"
      ) {
        count++;
      }
    }
  }
}

console.log(count);
