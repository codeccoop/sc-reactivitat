const { Observable, getObservable, watch } = require("./observables");

function reactive(target) {
  if (Array.isArray(target)) {
    target = target.reduce((a, v, i) => {
      a[i] = v;
      return a;
    }, {});
  }

  const handler = {
    get(target, key) {
      const observable = getObservable(target, key);
      observable.depend();

      return target[key];
    },
    set(target, key, to) {
      const oldKeys = Object.keys(target);
      const from = target[key];

      if (from !== to) {
        target[key] = to;
        const observable = getObservable(target, key);
        observable.notify();
      }

      if (oldKeys.indexOf(key) === -1) {
        const observable = getObservable(target, "__keys");
        observable.notify("__keys", Object.keys(target), oldKeys);
      }

      return target[key];
    },
    ownKeys(target) {
      const observable = getObservable(target, "__keys");
      observable.depend();
      return Reflect.ownKeys(target);
    },
  };

  return new Proxy(target, handler);
}

function ref(value) {
  const observable = Observable();
  const proxy = {
    get value() {
      observable.depend();
      return value;
    },
    set value(to) {
      const from = value;
      value = to;
      observable.notify("value", to, from);
    },
  };

  return proxy;
}

function computed(getter) {
  const result = ref();
  watch(() => (result.value = getter()));
  return result;
}

module.exports = {
  reactive,
  ref,
  computed,
};
