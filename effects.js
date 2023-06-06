const { fallbackGet } = require("./helpers");

let activeEffect; // Global variable to track the current running effect

class TargetMap extends WeakMap {} // Reactive objects references store
class DepsMap extends Map {} // Dependencies references store
class Dep extends Set {} // Array of dependencies

const targetMap = new TargetMap(); // Singletone TargetMap instance

/*
 * Triggers effects bounds to a value change
 *
 * @param {ReactiveObject} target
 * @param {String} key
 * @param {Array} change
 */
function trigger(target, key, change) {
  const depsMap = fallbackGet(targetMap, target, new DepsMap());
  if (depsMap.has(key)) {
    depsMap.get(key).forEach((effect) => effect(...change));
  }
}

/*
 * Store activeEffect as effect bound to a reactive value
 *
 * @param {ReactiveObject} target
 * @param {String} key
 */
function track(target, key) {
  if (!activeEffect) return;

  const depsMap = fallbackGet(targetMap, target, new DepsMap());
  const dep = fallbackGet(depsMap, key, new Dep());
  dep.add(activeEffect);
}

/*
 * Tracks effect function
 *
 * @param {Function} effect
 */
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

/*
 * Bound a watcher to a reactive value changes
 *
 * @param {ReactiveObject} target
 * @param {String} key
 * @param {Function} watcher
 */
function watch(target, key, watcher) {
  const depsMap = fallbackGet(targetMap, target, new DepsMap());
  const dep = fallbackGet(depsMap, key, new Dep());
  dep.add(watcher);
}

module.exports = {
  trigger,
  track,
  watchEffect,
  watch,
};
