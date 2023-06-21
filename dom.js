const { watch } = require("./observables");

function render(el, component, onRender) {
  watch(() => {
    el.innerHTML = component();
    onRender();
  });
}

module.exports = { render };
