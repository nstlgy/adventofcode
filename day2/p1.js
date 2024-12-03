const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const data = input.split("\n").map((value) => value.split(" ").map(Number));

let validCount = 0;

for (let i = 0; i < data.length; i++) {
  const arr = data[i];
  let isValid = true;
  let isDescending = arr[0] > arr[1];

  for (let j = 0; j < arr.length - 1; j++) {
    let diff = Math.abs(arr[j] - arr[j + 1]);

    if (diff < 1 || diff > 3) {
      isValid = false;
      break;
    }

    if (isDescending && arr[j] <= arr[j + 1]) {
      isValid = false;
      break;
    }

    if (!isDescending && arr[j] >= arr[j + 1]) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    validCount++;
  }
}

console.log(validCount);
