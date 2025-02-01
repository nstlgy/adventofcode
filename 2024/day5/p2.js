const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const data = input.split("\n");

const RULES = data
  .slice(0, data.indexOf(""))
  .map((e) => e.split("|").map(Number));

const UPDATES = data
  .slice(data.indexOf("") + 1)
  .map((line) => line.split(",").map((item) => Number(item.trim())));

let valid = true;
let invalidUpdates = [];

const graph = {};
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

  for (let i = 0; i < update.length && valid; i++) {
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
  }
  if (!valid) {
    invalidUpdates.push(update);
  }
}

function sortInvalidUpdates(invalidUpdates) {
  return invalidUpdates.map((update) => {
    let pageMap = new Map(update.map((page, index) => [page, index]));
    let sorted = false;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < update.length - 1; i++) {
        for (let j = i + 1; j < update.length; j++) {
          if (graph[update[i]] && graph[update[i]].includes(update[j])) {
            [update[i], update[j]] = [update[j], update[i]];
            sorted = false;
          }
        }
      }
    }
    return update;
  });
}

const sortedInvalidUpdates = sortInvalidUpdates(invalidUpdates);

let sumOfMiddlePages = sortedInvalidUpdates.reduce((sum, update) => {
  const middleIndex = Math.floor((update.length - 1) / 2);
  return sum + update[middleIndex];
}, 0);

console.log(sumOfMiddlePages);
