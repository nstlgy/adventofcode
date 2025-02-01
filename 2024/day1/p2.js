const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const list = input.split("\n").map((value) => value.split("  ").map(Number));

const leftList = [...list.map((value) => value[0])].sort((a, b) => a - b);
const rightList = [...list.map((value) => value[1])].sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < leftList.length; i++) {
  let freq = 0;
  for (let j = 0; j < rightList.length; j++) {
    if (leftList[i] === rightList[j]) freq++;
  }
  result += leftList[i] * freq;
}
console.log(result);
