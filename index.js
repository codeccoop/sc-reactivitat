const { mount } = require("./lib/vdom");
const state = require("./lib/state");
const App = require("./App");
const todos = require("./data/todos");
state.setState(todos);

const container = document.getElementById("container");

state.subscribe(() => mount(App, container));
mount(App, container);
