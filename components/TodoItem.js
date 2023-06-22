const { h } = require("../lib/vdom");
const state = require("../lib/state");

function TodoItem({ todo, done }) {
  function onClick(ev) {
    const todo = ev.target.dataset.todo;
    state.setState({ ...state.getState(), [todo]: !done });
  }

  return h("li", { "class": "todo-item" + (done ? " done" : "") }, [
    h("span", null, todo),
    h("button", { "data-todo": todo, "onClick": onClick }, "Done"),
  ]);
}

module.exports = TodoItem;
