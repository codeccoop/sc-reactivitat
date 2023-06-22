function State() {
  let state;
  const subscribers = new Set();
  return {
    setState(data) {
      state = data;
      subscribers.forEach((effect) => effect(state));
    },
    getState() {
      return Object.freeze(state);
    },
    subscribe(effect) {
      subscribers.add(effect);
    },
  };
}

module.exports = State();
