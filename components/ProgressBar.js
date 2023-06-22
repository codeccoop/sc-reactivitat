const { h } = require("../lib/vdom");

function ProgressBar({ progress }) {
  const label = Math.round(progress.value * 100) + "%";

  return h("div", { "class": "progress" }, [
    h("span", { "class": "label" }, label),
    h("div", { "class": "done", "style": "flex:" + progress.value }),
    h("div", { "class": "pending", "style": "flex:" + (1 - progress.value) }),
  ]);
}

module.exports = ProgressBar;
