import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <span ref="message">${data.message}</span>
`

const style = `
  :host {
    display: none;
    z-index: 8;
    font-family: var(--type-body);
    position: fixed;
    bottom: 0.5em;
    left: 0.5em;
    background-color: #000;
    color: #fff;
    padding: 0.5em;
    text-align: center;
  }

  :host(.active) {
    display: flex;
  }
`

export function toast(spec) {
  let { _root } = spec;
  const _state = state(spec);
  const _web_component = web_component(spec);

  const init = () => {}

  let display = (message, delay = 3000) => {
    _state.message = message
    _root.classList.add('active');
    if (delay !== 0) {
      setTimeout(() => _root.classList.remove('active'), delay);
    }
  }

  let hide = () => {
    _root.classList.remove('active');
  }

  return Object.freeze({
    ..._web_component,
    display,
    hide
  })
}

define_component({
  name: 'ad-toast',
  component: toast,
  template,
  style
});
