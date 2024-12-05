const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const regexp = /mul\((\d{1,3}),(\d{1,3})\)/g;
const myArray = [...input.matchAll(regexp)];

const mulArray = myArray.map((match) => {
  const [, num1, num2] = match;
  return Number(num1) * Number(num2);
});

const result = mulArray.reduce((total, curr) => total + curr, 0);
console.log(result);
