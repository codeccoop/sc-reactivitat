const { mount } = require("./lib/vdom");
const store = require("./lib/store");
const App = require("./App");
const todos = require("./data/todos");
store.setState(todos);

const container = document.getElementById("container");

store.subscribe(() => mount(App, container));
mount(App, container);
