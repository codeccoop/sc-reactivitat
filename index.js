const { render } = require("./dom");
const { App } = require("./components");
const store = require("./store");

const rootEl = document.getElementById("app");

function onRender() {
  const buttons = Array.from(document.getElementsByTagName("button"));
  buttons.forEach((btn) => {
    const todo = btn.dataset.todo;
    btn.addEventListener("click", () => (store[todo] = !store[todo]));
  });

  const input = document.getElementById("addTodo");
  input.addEventListener("change", (ev) => {
    const todo = ev.target.value;
    store[todo] = false;
    render(rootEl, App, onRender);
  });
}

render(rootEl, App, onRender);
