const { computed } = require("./lib/reactivity");
const todos = require("./data/todos");
const { watch } = require("./lib/observables");

const names = computed(() => Array.from(Object.keys(todos.value)));
const count = computed(() => names.value.length);
const progress = computed(
  () => Object.keys(todos.value).filter((todo) => todos.value[todo]).length / count.value
);

watch(() => {
  console.log("Count: ", count.value);
  console.log("Progress: ", Math.round(progress.value * 100) + "%");
});

todos.value = { ...todos.value, [names.value[0]]: true };
todos.value = { ...todos.value, [names.value[1]]: true };
todos.value = { ...todos.value, [names.value[2]]: true };

let i = 1;
const interval = setInterval(() => {
  todos.value = { ...todos.value, ["Task-" + i]: false };
  i++;
  if (i === 10) {
    clearInterval(interval);
  }
}, 1000);
