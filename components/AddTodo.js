const { h } = require("../lib/vdom");

function AddTodo({ todos }) {
  function onChange(ev) {
    const todo = ev.target.value;
    todos[todo] = false;
  }

  return h("div", { "class": "field" }, [
    h("label", null, "Add todo"),
    h("input", { "id": "addTodo", "type": "text", "onChange": onChange }),
  ]);
}

module.exports = AddTodo;
