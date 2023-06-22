const { h } = require("../lib/vdom");

function ProgressBar({ progress }) {
  const label = Math.round(progress * 100) + "%";

  return h("div", { "class": "progress" }, [
    h("span", { "class": "label" }, label),
    h("div", { "class": "done", "style": "flex:" + progress }),
    h("div", { "class": "pending", "style": "flex:" + (1 - progress) }),
  ]);
}

module.exports = ProgressBar;
