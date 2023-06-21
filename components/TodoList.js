const { h } = require("../lib/vdom");
const { computed } = require("../lib/reactivity");

const todos = require("../data/todos");
const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const names = computed(() => Array.from(Object.keys(todos)));
  const count = computed(() => names.value.length);
  const progress = computed(
    () => names.value.filter((todo) => todos[todo]).length / count.value
  );

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "TODOS"),
    ProgressBar({ count, progress }),
    h(
      "ul",
      { "class": "todo-list" },
      names.value.map((todo) =>
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
