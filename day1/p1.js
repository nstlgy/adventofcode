const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const test = input.split("\n").map((value) => value.split("  ").map(Number));

const leftList = [...test.map((value) => value[0])].sort((a, b) => a - b);
const rightList = [...test.map((value) => value[1])].sort((a, b) => a - b);

const distance = leftList.map((value, index) => {
  return Math.abs(value - rightList[index]);
});

const totalDistance = distance.reduce((sum, curr) => sum + curr, 0);
console.log(totalDistance);
