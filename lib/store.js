function Store() {
  const subcribers = new Set();
  return {
    setState(data) {
      state = data;
    },
    getState() {
      return Object.freeze(state);
    },
    subscribe(effect) {
      subcribers.add(effect);
    },
    dispatch(change) {
      state = { ...state, ...change };
      subcribers.forEach((effect) => effect(state));
    },
  };
}

module.exports = Store();
