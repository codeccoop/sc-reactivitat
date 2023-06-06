const { Dep, track, trigger, watchEffect, watch } = require("./effects");

/*
 * Wraps an object into a reactive proxy
 *
 * @param {Object} target
 */
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      track(target, key);

      return value;
    },
    set(target, key, value, receiver) {
      const from = target[key];
      const to = Reflect.set(target, key, value, receiver);
      if (to && from != to) {
        trigger(target, key, [to, from]);
      }

      return to;
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
  const proxy = {
    get value() {
      track(proxy, "value");
      return value;
    },
    set value(to) {
      const from = value;
      value = to;
      trigger(proxy, "value", [to, from]);
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
  watchEffect(() => (result.value = getter()));
  return result;
}

module.exports = {
  reactive,
  ref,
  computed,
  watch,
};
