const { Observable, getObservable, watch } = require("./observables");

const reactiveHandler = {
  get(target, key, receiver) {
    const observable = getObservable(target, key);
    observable.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, to, receiver) {
    const oldKeys = Reflect.ownKeys(target);
    const from = Reflect.get(target, key, receiver);

    if (from !== to) {
      target[key] = to;
      const observable = getObservable(target, key);
      observable.notify();
    }

    if (oldKeys.indexOf(key) === -1) {
      const observable = getObservable(target, "__keys");
      observable.notify("__keys", Object.keys(target), oldKeys);
    }

    return Reflect.get(target, key, receiver);
  },
  ownKeys(target) {
    const observable = getObservable(target, "__keys");
    observable.depend();
    return Reflect.ownKeys(target);
  },
};

function reactive(target) {
  return new Proxy(target, reactiveHandler);
}

function ref(value) {
  const observable = Observable();
  const proxy = {
    get value() {
      observable.depend();
      return value;
    },
    set value(to) {
      if (to !== value) {
        value = to;
        observable.notify();
      }
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
