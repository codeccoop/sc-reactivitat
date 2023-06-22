(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { h } = require("./lib/vdom");

const TodoList = require("./components/TodoList");

function App() {
  return h("div", { "id": "app" }, [TodoList()]);
}

module.exports = App;

},{"./components/TodoList":5,"./lib/vdom":10}],2:[function(require,module,exports){
const { h } = require("../lib/vdom");

function AddTodo({ todos }) {
  function onChange(ev) {
    const todo = ev.target.value;
    todos[todo] = false;
  }

  return h("div", { "class": "field" }, [
    h("label", null, "Add todo"),
    h("input", { "id": "addTodo", "type": "text", "onChange": onChange }),
  ]);
}

module.exports = AddTodo;

},{"../lib/vdom":10}],3:[function(require,module,exports){
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

},{"../lib/vdom":10}],4:[function(require,module,exports){
const { h } = require("../lib/vdom");

const todos = require("../data/todos");

function TodoItem({ todo, done }) {
  function onClick() {
    todos[todo] = !todos[todo];
    console.log(Object.values(todos));
  }

  return h("li", { "class": "todo-item" + (done ? " done" : "") }, [
    h("span", null, todo),
    h("button", { "data-todo": todo, onClick }, "Done"),
  ]);
}

module.exports = TodoItem;

},{"../data/todos":6,"../lib/vdom":10}],5:[function(require,module,exports){
const { h } = require("../lib/vdom");
const { computed } = require("../lib/reactivity");

const todos = require("../data/todos");
const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const progress = computed(() => {
    const done = Object.keys(todos).filter((todo) => todos[todo]).length;
    const count = Object.keys(todos).length;
    return done / count;
  });

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "Ets un bon cooperativiste?"),
    ProgressBar({ progress }),
    h(
      "ul",
      { "class": "todo-list" },
      Object.keys(todos).map((todo) =>
        TodoItem({
          todos,
          todo,
          done: todos[todo],
        })
      )
    ),
    h("div", null, [AddTodo({ todos })]),
  ]);
}

module.exports = TodoList;

},{"../data/todos":6,"../lib/reactivity":9,"../lib/vdom":10,"./AddTodo":2,"./ProgressBar":3,"./TodoItem":4}],6:[function(require,module,exports){
const { reactive } = require("../lib/reactivity");

const data = {
  "Ser soci d'una cooperativa": true,
  "Haver fet l'aportació de capital corresponent": true,
  "Complir amb les teves obligacions": true,
  "Participar activament a les assemblees": true,
};

module.exports = reactive(data);

},{"../lib/reactivity":9}],7:[function(require,module,exports){
const { mount } = require("./lib/vdom");

const App = require("./App");
const container = document.getElementById("container");
mount(App, container);

},{"./App":1,"./lib/vdom":10}],8:[function(require,module,exports){
let activeEffects = [];

function Observable() {
  return {
    subcribers: new Set(),
    notify() {
      this.subcribers.forEach((effect) => effect());
    },
    depend() {
      if (!activeEffects.length) return;
      this.subcribers.add(activeEffects[activeEffects.length - 1]);
    },
  };
}

let targetMap = new WeakMap();
function getObservable(target, key) {
  let observablesMap = targetMap.get(target);
  if (!observablesMap) {
    observablesMap = new Map();
    targetMap.set(target, observablesMap);
  }

  let observable = observablesMap.get(key);
  if (!observable) {
    observable = Observable();
    observablesMap.set(key, observable);
  }

  return observable;
}

function watch(effect) {
  activeEffects.push(effect);
  effect();
  activeEffects.pop();
}

module.exports = {
  Observable,
  getObservable,
  watch,
};

},{}],9:[function(require,module,exports){
const { Observable, getObservable, watch } = require("./observables");

const reactiveHandler = {
  get(target, key, receiver) {
    const observable = getObservable(target, key);
    observable.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, to, receiver) {
    const oldKeys = Reflect.ownKeys(target);
    const from = Reflect.get(target, key, receiver);

    if (from !== to) {
      target[key] = to;
      const observable = getObservable(target, key);
      observable.notify();
    }

    if (oldKeys.indexOf(key) === -1) {
      const observable = getObservable(target, "__keys");
      observable.notify("__keys", Object.keys(target), oldKeys);
    }

    return Reflect.get(target, key, receiver);
  },
  ownKeys(target) {
    const observable = getObservable(target, "__keys");
    observable.depend();
    return Reflect.ownKeys(target);
  },
};

function reactive(target) {
  return new Proxy(target, reactiveHandler);
}

function ref(value) {
  const observable = Observable();
  const proxy = {
    get value() {
      observable.depend();
      return value;
    },
    set value(to) {
      if (to !== value) {
        value = to;
        observable.notify();
      }
    },
  };

  return proxy;
}

function computed(getter) {
  const result = ref();
  watch(() => (result.value = getter()));
  return result;
}

module.exports = {
  reactive,
  ref,
  computed,
};

},{"./observables":8}],10:[function(require,module,exports){
const { watch } = require("./observables");

function h(tag, props, children) {
  return { tag, props, children };
}

function render(vdom, container) {
  const el = document.createElement(vdom.tag);

  if (vdom.props) {
    for (let key in vdom.props) {
      if (key.match(/^on[A-Z]/)) {
        const event = key.replace(/^on/, "").toLowerCase();
        el.addEventListener(event, vdom.props[key]);
      } else {
        el.setAttribute(key, vdom.props[key]);
      }
    }
  }

  if (vdom.children) {
    if (typeof vdom.children === "string") {
      el.textContent = vdom.children;
    } else {
      for (let child of vdom.children) {
        render(child, el);
      }
    }
  }

  container.appendChild(el);
  vdom.el = el;
}

function patch(to, from) {
  if (from.props) {
    for (let key in from.props) {
      if (/^on[A-Z]/.test(key)) {
        const event = key.replace(/^on/, "").toLowerCase();
        from.el.removeEventListener(event, from.props[key]);
      } else {
        from.el.removeAttribute(key);
      }
    }
  }

  if (from.children) {
    if (typeof from.children === "string") {
      from.el.textContent = null;
    } else {
      for (let child of from.children) {
        from.el.removeChild(child.el);
      }
    }
  }

  to.el = from.el;
  if (to.props) {
    for (let key in to.props) {
      if (/^on[A-Z]/.test(key)) {
        const event = key.replace(/^on/, "").toLowerCase();
        to.el.addEventListener(event, to.props[key]);
      } else {
        to.el.setAttribute(key, to.props[key]);
      }
    }
  }

  if (to.children) {
    if (typeof to.children === "string") {
      to.el.textContent = child;
    } else {
      for (let child of to.children) {
        render(child, to.el);
      }
    }
  }
}

function mount(component, container) {
  let isMounted = false;
  let oldVdom;
  watch(() => {
    const vdom = component();
    if (!isMounted) {
      render(vdom, container);
      isMounted = true;
    } else {
      patch(vdom, oldVdom);
    }
    oldVdom = vdom;
  });
}

module.exports = { mount, h };

},{"./observables":8}]},{},[7]);
