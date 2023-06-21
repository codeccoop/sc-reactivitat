const { h } = require("../lib/vdom");
const store = require("../lib/store");

function AddTodo() {
  function onChange(ev) {
    store.dispatch({ [ev.target.value]: false });
  }
  return h("div", { "class": "field" }, [
    h("label", null, "Add todo"),
    h("input", { "id": "addTodo", "type": "text", "onChange": onChange }),
  ]);
}

module.exports = AddTodo;
