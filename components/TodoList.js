const { h } = require("../lib/vdom");
const store = require("../lib/store");

const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const state = store.getState();

  const todos = Array.from(Object.keys(state));
  const count = todos.length;
  const progress = todos.filter((todo) => state[todo]).length / count;

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "TODOS"),
    ProgressBar({ count, progress }),
    h(
      "ul",
      { "class": "todo-list" },
      todos.map((todo, i) => TodoItem({ todo, done: state[todo] }))
    ),
    h("div", null, [AddTodo()]),
  ]);
}

module.exports = TodoList;
