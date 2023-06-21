const { mount } = require("./lib/vdom");

const App = require("./App");
const container = document.getElementById("container");
mount(App, container);
