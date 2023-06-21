let activeEffects = []; // Global variable to track the current running effects

class Dep {
  subcribers = new Set();

  notify(to, from) {
    this.subcribers.forEach((effect) => effect(to, from));
  }

  depend() {
    if (!activeEffects.length) return;
    this.subcribers.add(activeEffects[activeEffects.length - 1]);
  }
}

let targetMap = new WeakMap();
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

/*
 * Tracks effect function
 *
 * @param {Function} effect
 */
function watchDeps(effect) {
  activeEffects.push(effect);
  effect();
  activeEffects.pop();
}

module.exports = {
  Dep,
  getDep,
  watchDeps,
};
