const { h } = require("../lib/vdom");
const state = require("../lib/state");

const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const currentState = state.getState();

  const todos = Array.from(Object.keys(currentState));
  const count = todos.length;
  const progress = todos.filter((todo) => currentState[todo]).length / count;

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "Ets un bon cooperativiste?"),
    ProgressBar({ progress }),
    h(
      "ul",
      { "class": "todo-list" },
      todos.map((todo, i) => TodoItem({ todo, done: currentState[todo] }))
    ),
    h("div", null, [AddTodo()]),
  ]);
}

module.exports = TodoList;
