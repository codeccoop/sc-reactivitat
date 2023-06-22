const { computed } = require("./lib/reactivity");
const todos = require("./data/todos");
const { watch } = require("./lib/observables");

const names = computed(() => Array.from(Object.keys(todos.value)));
const count = computed(() => names.value.length);
const progress = computed(() => {
  const done = Object.keys(todos.value).filter((todo) => todos.value[todo]).length;
  return Math.round((done / count.value) * 100) + "%";
});

watch(() => {
  console.log("Ets un bon cooperativa?\n");
  Object.keys(todos.value).forEach((k) => {
    console.log(k + ":", todos.value[k]);
  });
  console.log("\nEts un cooperativista al " + progress.value);
});

// todos.value = { ...todos.value, "Nocions sobre feminisme": false };
// todos.value = { ...todos.value, "Gaudir de la intercooperació": false };
// todos.value = { ...todos.value, "Tenir temps lliure": false };
// todos.value = { ...todos.value, "Tenir a la familia tranquila": false };
// todos.value = { ...todos.value, "Cobrar més que els teus amics": false };
