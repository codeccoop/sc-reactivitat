const { watchDeps } = require("./reactivity");

function render(el, component, onRender) {
  watchDeps(() => {
    el.innerHTML = component();
    onRender(el);
  });
}

module.exports = { render };
