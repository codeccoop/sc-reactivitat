const store = require("./lib/store");
const todos = require("./data/todos");
store.setState(todos);

let progress;
function setProgress(state) {
  progress =
    Object.keys(state).filter((k) => state[k]).length / Object.keys(state).length;
}

function howImDoing(state) {
  setProgress(state);
  console.log("Ets un cooperativiste al " + Math.round(progress * 100) + "%");
}
store.subscribe(howImDoing);
howImDoing(store.getState());

// store.dispatch({ "Nocions sobre feminisme": false });
// store.dispatch({ "Assemblea de cures": false });
// store.dispatch({ "Capacitat de treball en equip": false });
// store.dispatch({ "Gaudir amb la intercooperació": false });
// store.dispatch({ "Tenir temps lliure": false });
