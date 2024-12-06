const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;
const matches = input.split(/(?=mul|do\(\)|don't\(\))/);
let isEnabled = true;
const newArr = [];

for (const match of matches) {
  if (dontRegex.test(match)) {
    isEnabled = false;
  } else if (doRegex.test(match)) {
    isEnabled = true;
  } else if (isEnabled && mulRegex.test(match)) {
    const mulFind = mulRegex.exec(match);
    const [, num1, num2] = mulFind;
    const mul = num1 * num2;
    newArr.push(mul);
  }
}

const result = newArr.reduce((total, curr) => total + curr, 0);
console.log(result);
