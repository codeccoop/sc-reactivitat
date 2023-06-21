let activeEffect;

class Observable {
  constructor(value) {
    this.subcribers = new Set();
    this._value = value;
  }

  get value() {
    this.depend();
    return this._value;
  }

  set value(to) {
    if (to !== this._value) {
      this._value = to;
      this.notify();
    }
  }

  notify() {
    this.subcribers.forEach((effect) => effect());
  }

  depend() {
    if (!activeEffect) return;
    this.subcribers.add(activeEffect);
  }
}

function watch(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

module.exports = {
  Observable,
  watch,
};
