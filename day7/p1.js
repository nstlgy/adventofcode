const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8").trim();
const input = data.split("\n");

const sumArr = [];
for (let i of input) {
  let total = Number(i.split(":")[0]);
  let digitsArray = i.split(":")[1].trim().split(" ").map(Number);
  const result = calculateTotal(digitsArray, total);
  if (result === total) {
    console.log("YES");
    sumArr.push(total);
  } else {
    console.log("NO");
  }
}

const finalSum = sumArr.reduce((curr, val) => {
  return curr + val;
});

console.log(finalSum);

function calculateTotal(digitsArray, total) {
  const gaps = digitsArray.length - 1;
  const operators = ["+", "*"];
  const combinations = [];
  const totalCombinations = Math.pow(2, gaps);

  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    for (let j = 0; j < gaps; j++) {
      const bit = (i >> j) & 1;
      combination.push(operators[bit]);
    }
    combinations.push(combination);
  }

  for (let combination of combinations) {
    let result = digitsArray[0];
    for (let i = 0; i < combination.length; i++) {
      if (combination[i] == "+") {
        result += digitsArray[i + 1];
      } else if (combination[i] === "*") {
        result *= digitsArray[i + 1];
      }
    }
    if (result === total) {
      return result;
    }
  }
}
