const { h } = require("../lib/vdom");
const store = require("../lib/store");

function TodoItem({ todo, done }) {
  function onClick(ev) {
    const todo = ev.target.dataset.todo;
    store.dispatch({ [todo]: !done });
  }

  return h("li", { "class": "todo-item" + (done ? " done" : "") }, [
    h("span", null, todo),
    h("button", { "data-todo": todo, "onClick": onClick }, "Done"),
  ]);
}

module.exports = TodoItem;
