const state = require("./lib/state");
const todos = require("./data/todos");
state.setState(todos);

let progress;
function setProgress(state) {
  const done = Object.keys(state).filter((k) => state[k]).length;
  const todo = Object.keys(state).length;
  progress = Math.round((done / todo) * 100) + "%";
}

function howImDoing(state) {
  setProgress(state);
  console.log("Ets un bon cooperativista?\n");
  Object.keys(state).forEach((k) => {
    console.log(k + ":", state[k]);
  });
  console.log("\nEts un cooperativiste al " + progress);
}

state.subscribe(howImDoing);
howImDoing(state.getState());

// state.setState({ ...state.getState(), "Nocions sobre feminisme": false });
// state.setState({ ...state.getState(), "Assemblea de cures": false });
// state.setState({ ...state.getState(), "Capacitat de treball en equip": false });
// state.setState({ ...state.getState(), "Gaudir amb la intercooperació": false });
// state.setState({ ...state.getState(), "Tenir temps lliure": false });
// state.setState({ ...state.getState(), "Tenir a la familia tranquila": false });
// state.setState({ ...state.getState(), "Cobrar més que els teus amics": false });
