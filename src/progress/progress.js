import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <progress ref="progress"></progress>
`

const style = `
  :host {
    display: none;
    position: fixed;
    top: -6px;
    left: 0;
    z-index: 8;
  }

  progress {
    width: auto;
    min-width: 100vw;
  }

  :host(.active) {
    display: block;
  }
`

export function progress(spec) {
  let { _root } = spec;
  const _state = state(spec);
  const _web_component = web_component(spec);

  const init = () => {}

  let show = () => {
    _root.classList.add('active');
  }

  let hide = () => {
    _root.classList.remove('active');
  }

  return Object.freeze({
    ..._web_component,
    show,
    hide
  })
}

define_component({
  name: 'ad-progress',
  component: progress,
  template,
  style
});
