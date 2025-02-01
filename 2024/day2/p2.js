const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");
const data = input.split("\n").map((value) => value.split(" ").map(Number));

let validCount = 0;

function isValid(arr) {
  if (arr.length < 2) return true;

  const isDescending = arr[0] > arr[1];

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1]);

    if (diff < 1 || diff > 3) return false;

    if (isDescending && arr[i] <= arr[i + 1]) return false;
    if (!isDescending && arr[i] >= arr[i + 1]) return false;
  }

  return true;
}

function dampner(arr, isDescending) {
  if (isValid(arr)) {
    return true;
  }

  for (let j = 0; j < arr.length; j++) {
    const modifiedArray = [...arr.slice(0, j), ...arr.slice(j + 1)];
    if (isValid(modifiedArray)) {
      return true;
    }
  }

  return false;
}

for (const report of data) {
  if (dampner(report)) validCount++;
}

console.log(validCount);
