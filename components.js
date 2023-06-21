const { computed } = require("./reactivity");
const store = require("./store");

function TodoList({ store, todos, count, progress }) {
  return `<h1>TODOs</h1>
    ${ProgressBar({ count, progress })}
    <ul class="todo-list">
      ${todos.value.map((todo) => TodoItem({ todo, done: store[todo] }))}
    </ul>
    <div>${AddTodo()}</div>`;
}

function ProgressBar({ count, progress }) {
  const label = computed(() => {
    return `${count.value * progress.value}/${count.value}`;
  });

  return `<div class="progress">
    <span class="label">${label.value}</span>
    <div class="done" style="flex: ${progress.value}"></div>
    <div class="pending" style="flex: ${1 - progress.value}"></div>
  </div>`;
}

function TodoItem({ todo }) {
  return `<li class="todo-item ${
    store[todo] ? "done" : "pending"
  }">${todo}<button data-todo="${todo}">Done</button></li>`;
}

function AddTodo() {
  return `<input id="addTodo" type="text" />`;
}

function App() {
  const todos = computed(() => Array.from(Object.keys(store)));
  const count = computed(() => todos.value.length);
  const progress = computed(
    () => todos.value.filter((todo) => store[todo]).length / count.value
  );

  return `<div id="app">
    ${TodoList({ store, todos, count, progress })}
  </div>`;
}

module.exports = { App };
