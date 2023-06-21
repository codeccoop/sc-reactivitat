let activeEffects = [];

function Observable() {
  return {
    subcribers: new Set(),
    notify() {
      this.subcribers.forEach((effect) => effect());
    },
    depend() {
      if (!activeEffects.length) return;
      this.subcribers.add(activeEffects[activeEffects.length - 1]);
    },
  };
}

let targetMap = new WeakMap();
function getObservable(target, key) {
  let observablesMap = targetMap.get(target);
  if (!observablesMap) {
    observablesMap = new Map();
    targetMap.set(target, observablesMap);
  }

  let observable = observablesMap.get(key);
  if (!observable) {
    observable = Observable();
    observablesMap.set(key, observable);
  }

  return observable;
}

function watch(effect) {
  activeEffects.push(effect);
  effect();
  activeEffects.pop();
}

module.exports = {
  Observable,
  getObservable,
  watch,
};
