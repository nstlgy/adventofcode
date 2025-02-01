const fs = require("fs");

// Read and parse input
const data = fs.readFileSync("input.txt", "utf8").trim();
const input = data.split("\n");

const sumArr = [];

input.forEach((line) => {
  const [total, digits] = line
    .split(":")
    .map((part, index) =>
      index === 0 ? Number(part) : part.trim().split(" ").map(Number),
    );

  if (isTotalAchievable(digits, total)) {
    console.log("YES");
    sumArr.push(total);
  } else {
    console.log("NO");
  }
});

const finalSum = sumArr.reduce((sum, value) => sum + value, 0);
console.log(finalSum);

function isTotalAchievable(digitsArray, targetTotal) {
  const combinations = generateOperatorCombinations(digitsArray.length - 1);

  for (const combination of combinations) {
    if (evaluateExpression(digitsArray, combination) === targetTotal) {
      return true;
    }
  }
  return false;
}

function generateOperatorCombinations(gaps) {
  const operators = ["+", "*"];
  const totalCombinations = Math.pow(2, gaps);
  const combinations = [];

  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    for (let j = 0; j < gaps; j++) {
      combination.push(operators[(i >> j) & 1]);
    }
    combinations.push(combination);
  }

  return combinations;
}

function evaluateExpression(digitsArray, operators) {
  return operators.reduce(
    (result, operator, index) =>
      operator === "+"
        ? result + digitsArray[index + 1]
        : result * digitsArray[index + 1],
    digitsArray[0],
  );
}
