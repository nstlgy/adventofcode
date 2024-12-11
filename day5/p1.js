const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const data = input.split("\n");

const RULES = data
  .slice(0, data.indexOf(""))
  .map((e) => e.split("|").map(Number));

const UPDATES = data
  .slice(data.indexOf("") + 1)
  .map((line) => line.split(",").map((item) => Number(item.trim())));

const graph = {};
let sumOfMiddle = 0;

RULES.forEach(([x, y]) => {
  if (!graph[x]) {
    graph[x] = [];
  }
  graph[x].push(y);
});

for (let update of UPDATES) {
  const position = new Map();
  update.forEach((page, idx) => position.set(page, idx));

  let valid = true;

  for (let i = 0; i < update.length; i++) {
    let page = update[i];
    if (graph[page]) {
      for (let afterPage of graph[page]) {
        if (
          position.has(afterPage) &&
          position.get(page) > position.get(afterPage)
        ) {
          valid = false;
          break;
        }
      }
    }
    if (!valid) {
      break;
    }
  }
  if (valid) {
    const middle = update[Math.floor(update.length / 2)];
    sumOfMiddle += middle;
  }
}

console.log(sumOfMiddle);
