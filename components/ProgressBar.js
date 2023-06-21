const { h } = require("../lib/vdom");
const { computed } = require("../lib/reactivity");

function ProgressBar({ count, progress }) {
  const label = computed(() => `${count.value * progress.value}/${count.value}`);

  return h("div", { "class": "progress" }, [
    h("span", { "class": "label" }, label.value),
    h("div", { "class": "done", "style": "flex:" + progress.value }),
    h("div", { "class": "pending", "style": "flex:" + (1 - progress.value) }),
  ]);
}

module.exports = ProgressBar;
