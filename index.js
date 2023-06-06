const { computed, watchDeps } = require("./reactivity");
const { TodoList, bindInteraction } = require("./dom");
const { todos } = require("./data");

let progress = computed(() => todos.filter((todo) => todo.done).length / todos.length);

document.addEventListener("DOMContentLoaded", () => {
  watchDeps(() => {
    document.getElementById("app").innerHTML = TodoList({
      items: todos,
      progress: progress,
    });
    bindInteraction(todos);
  });
});
