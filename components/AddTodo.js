const { h } = require("../lib/vdom");
const state = require("../lib/state");

function AddTodo() {
  function onChange(ev) {
    state.setState({ ...state.getState(), [ev.target.value]: false });
  }
  return h("div", { "class": "field" }, [
    h("label", null, "Add todo"),
    h("input", { "id": "addTodo", "type": "text", "onChange": onChange }),
  ]);
}

module.exports = AddTodo;
