function TodoList({ items, progress }) {
  return `<h1>TODOs</h1>
    <div class="progress">
      <span class="done" style="flex: ${progress.value}"></span>
      <span class="pending" style="flex: ${1 - progress.value}"></span>
    </div>
    <ul class="todo-list">
      ${items.map((item) => TodoItem(item))}
    </ul>`;
}

function TodoItem({ task, done }) {
  return `<li class="todo-item ${
    done ? "done" : "pending"
  }">${task}<button>Done</button></li>`;
}

function bindInteraction(todos) {
  Array.from(document.getElementsByTagName("button")).forEach((button, index) => {
    button.addEventListener("click", () => {
      debugger;
      todos[index].done = !todos[index].done;
    });
  });
}

module.exports = { TodoList, bindInteraction };
