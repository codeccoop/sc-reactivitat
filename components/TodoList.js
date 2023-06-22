const { h } = require("../lib/vdom");
const { computed } = require("../lib/reactivity");

const todos = require("../data/todos");
const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const progress = computed(() => {
    const done = Object.keys(todos).filter((todo) => todos[todo]).length;
    const count = Object.keys(todos).length;
    return done / count;
  });

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "Ets un bon cooperativiste?"),
    ProgressBar({ progress }),
    h(
      "ul",
      { "class": "todo-list" },
      Object.keys(todos).map((todo) =>
        TodoItem({
          todos,
          todo,
          done: todos[todo],
        })
      )
    ),
    h("div", null, [AddTodo({ todos })]),
  ]);
}

module.exports = TodoList;
