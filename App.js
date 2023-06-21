const { h } = require("./lib/vdom");

const TodoList = require("./components/TodoList");

function App() {
  return h("div", { "id": "app" }, [TodoList()]);
}

module.exports = App;
