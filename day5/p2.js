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

// Graph
const graph = {};

RULES.forEach(([x, y]) => {
  if (!graph[x]) {
    graph[x] = [];
  }
  graph[x].push(y);
});

console.log(graph);

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
  for (let update of invalidUpdates) {
    const position = new Map();
    update.forEach((page, idx) => position.set(page, idx));
    console.log(position);
    for (let i = 0; i < update.length; i++) {
      let page = update[i];
      if (graph[page]) {
        for (let element of graph[page]) {
          if (
            position.has(element) &&
            position.get(page) > position.get(element)
          ) {
            const temp = update[position.get(page)];
            update[position.get(page)] = update[position.get(element)];
            update[position.get(element)] = temp;
          }
        }
      }
    }
    console.log(update);
  }
}

sortInvalidUpdates(invalidUpdates);

// console.log(invalidUpdates);
