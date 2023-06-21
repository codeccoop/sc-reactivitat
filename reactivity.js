const { Dep, getDep, watchDeps } = require("./deps");

/*
 * Wraps an object into a reactive proxy
 *
 * @param {Object} target
 */
function reactive(target) {
  if (Array.isArray(target)) {
    target = target.reduce((a, v, i) => {
      a[i] = v;
      return a;
    }, {});
  }

  const handler = {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();

      return target[key];
    },
    set(target, key, to) {
      const oldKeys = Object.keys(target);
      const from = target[key];

      if (from !== to) {
        target[key] = to;
        const dep = getDep(target, key);
        dep.notify(key, to, from);
      }

      if (oldKeys.indexOf(key) === -1) {
        const dep = getDep(target, "__keys");
        dep.notify("__keys", Object.keys(target), oldKeys);
      }

      return target[key];
    },
    ownKeys(target) {
      const dep = getDep(target, "__keys");
      dep.depend();
      return Reflect.ownKeys(target);
    },
  };

  return new Proxy(target, handler);
}

/*
 * Wrap a value into a reactive reference
 *
 * @param {Any} value;
 */
function ref(value) {
  const dep = new Dep();
  const proxy = {
    get value() {
      dep.depend();
      return value;
    },
    set value(to) {
      const from = value;
      value = to;
      dep.notify("value", to, from);
    },
  };

  return proxy;
}

/*
 * Bounds a getter function to a reactive object dependencies
 *
 * @param {Function} getter
 */
function computed(getter) {
  const result = ref();
  watchDeps(() => (result.value = getter()));
  return result;
}

module.exports = {
  reactive,
  ref,
  computed,
  watchDeps,
};
