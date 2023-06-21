const { Observable, watch } = require("./observables");

function computed(getter) {
  const observable = new Observable();
  watch(() => (observable.value = getter()));
  return observable;
}

module.exports = {
  computed,
};
