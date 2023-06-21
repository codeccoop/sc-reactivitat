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
