import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <span ref="a b">${data.a*data.a} + ${data.b*data.b} = ${data.a*data.a+data.b*data.b}</span>
  <input type="button" id="inca" value="a++">
  <input type="button" id="deca" value="a--">

  <input type="button" id="incb" value="b++">
  <input type="button" id="decb" value="b--">
`

const style = `
  :host {
    background-color: yellow;
  }
`

export function pythagorean(spec) {
  let { _root } = spec;
  const _state = state(spec);
  const _web_component = web_component(spec);

  const init = () => {}

  const effects = () => {
    const incABtn = _root.shadowRoot.querySelector('#inca');
    const decABtn = _root.shadowRoot.querySelector('#deca');
    const incBBtn = _root.shadowRoot.querySelector('#incb');
    const decBBtn = _root.shadowRoot.querySelector('#decb');

    incABtn.addEventListener('click', incA);
    decABtn.addEventListener('click', decA);
    incBBtn.addEventListener('click', incB);
    decBBtn.addEventListener('click', decB);
  }

  const incA = () => { _state.a++; }
  const decA = () => { _state.a--; }
  const incB = () => { _state.b++; }
  const decB = () => { _state.b--; }

  return Object.freeze({
    ..._web_component,
    effects
  })
}

define_component({
  name: 'pythagorean-solver',
  component: pythagorean,
  template,
  style,
  props: ['a','b']
})
