let activeEffect; // Global variable to track the current running effect

class Dep {
  subcribers = new Set();

  notify(to, from) {
    this.subcribers.forEach((effect) => effect(to, from));
  }

  depend() {
    if (!activeEffect) return;
    this.subcribers.add(activeEffect);
  }
}

const targetMap = new WeakMap();
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
  activeEffect = () => effect();
  effect();
  activeEffect = null;
}

module.exports = {
  Dep,
  getDep,
  watchDeps,
};
