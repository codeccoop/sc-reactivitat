const { reactive } = require("./reactivity");

const todos = [
  { done: false, task: "Reactivity workshop" },
  { done: false, task: "Landing pages" },
  { done: false, task: "Endesa" },
].map((todo) => reactive(todo));

module.exports = { todos };
