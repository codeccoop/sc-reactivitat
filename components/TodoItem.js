const { h } = require("../lib/vdom");

const todos = require("../data/todos");

function TodoItem({ todo, done }) {
  function onClick() {
    todos[todo] = !todos[todo];
  }

  return h("li", { "class": "todo-item" + (done ? " done" : "") }, [
    h("span", null, todo),
    h("button", { "data-todo": todo, onClick }, "Done"),
  ]);
}

module.exports = TodoItem;
