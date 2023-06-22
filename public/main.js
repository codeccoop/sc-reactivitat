(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { h } = require("./lib/vdom");

const TodoList = require("./components/TodoList");

function App() {
  return h("div", { "id": "app" }, [TodoList()]);
}

module.exports = App;

},{"./components/TodoList":5,"./lib/vdom":9}],2:[function(require,module,exports){
const { h } = require("../lib/vdom");
const state = require("../lib/state");

function AddTodo() {
  function onChange(ev) {
    state.setState({ ...state.getState(), [ev.target.value]: false });
  }
  return h("div", { "class": "field" }, [
    h("label", null, "Add todo"),
    h("input", { "id": "addTodo", "type": "text", "onChange": onChange }),
  ]);
}

module.exports = AddTodo;

},{"../lib/state":8,"../lib/vdom":9}],3:[function(require,module,exports){
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

},{"../lib/vdom":9}],4:[function(require,module,exports){
const { h } = require("../lib/vdom");
const state = require("../lib/state");

function TodoItem({ todo, done }) {
  function onClick(ev) {
    const todo = ev.target.dataset.todo;
    state.setState({ ...state.getState(), [todo]: !done });
  }

  return h("li", { "class": "todo-item" + (done ? " done" : "") }, [
    h("span", null, todo),
    h("button", { "data-todo": todo, "onClick": onClick }, "Done"),
  ]);
}

module.exports = TodoItem;

},{"../lib/state":8,"../lib/vdom":9}],5:[function(require,module,exports){
const { h } = require("../lib/vdom");
const state = require("../lib/state");

const ProgressBar = require("./ProgressBar");
const TodoItem = require("./TodoItem");
const AddTodo = require("./AddTodo");

function TodoList() {
  const currentState = state.getState();

  const todos = Array.from(Object.keys(currentState));
  const count = todos.length;
  const progress = todos.filter((todo) => currentState[todo]).length / count;

  return h("div", { "class": "list-wrapper" }, [
    h("h1", null, "Ets un bon cooperativiste?"),
    ProgressBar({ progress }),
    h(
      "ul",
      { "class": "todo-list" },
      todos.map((todo, i) => TodoItem({ todo, done: currentState[todo] }))
    ),
    h("div", null, [AddTodo()]),
  ]);
}

module.exports = TodoList;

},{"../lib/state":8,"../lib/vdom":9,"./AddTodo":2,"./ProgressBar":3,"./TodoItem":4}],6:[function(require,module,exports){
const data = {
  "Ser soci d'una cooperativa": true,
  "Haver fet l'aportació de capital corresponent": true,
  "Complir amb les teves obligacions": true,
  "Participar activament a les assemblees": true,
};

module.exports = data;

},{}],7:[function(require,module,exports){
const { mount } = require("./lib/vdom");
const state = require("./lib/state");
const App = require("./App");
const todos = require("./data/todos");
state.setState(todos);

const container = document.getElementById("container");

state.subscribe(() => mount(App, container));
mount(App, container);

},{"./App":1,"./data/todos":6,"./lib/state":8,"./lib/vdom":9}],8:[function(require,module,exports){
function State() {
  let state;
  const subscribers = new Set();
  return {
    setState(data) {
      state = data;
      subscribers.forEach((effect) => effect(state));
    },
    getState() {
      return Object.freeze(state);
    },
    subscribe(effect) {
      subscribers.add(effect);
    },
  };
}

module.exports = State();

},{}],9:[function(require,module,exports){
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

let isMounted = false;
let oldVdom;
function mount(component, container) {
  let vdom;
  if (!isMounted) {
    vdom = component();
    render(vdom, container);
    isMounted = true;
  } else {
    vdom = component();
    patch(vdom, oldVdom);
  }
  oldVdom = vdom;
}

module.exports = { mount, h };

},{}]},{},[7]);
