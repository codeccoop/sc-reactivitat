const { h } = require("../lib/vdom");

function ProgressBar({ count, progress }) {
  const label = `${count * progress}/${count}`;

  return h("div", { "class": "progress" }, [
    h("span", { "class": "label" }, label),
    h("div", { "class": "done", "style": "flex:" + progress }),
    h("div", { "class": "pending", "style": "flex:" + (1 - progress) }),
  ]);
}

module.exports = ProgressBar;
