import { html, state, web_component, define_component } from "/@melhosseiny/sourdough/src/index.mjs";

const template = (data) => html`
  <dialog>
    <p>This is a dialog</p>
  </dialog>
`

const style = `

`

export function dialog(spec) {
  let { _root } = spec;
  const _state = state(spec);
  const _web_component = web_component(spec);

  const init = () => {}

  const effects = () => {
    const dialog = _root.shadowRoot.querySelector('dialog');

    dialog.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target === dialog) {
        close();
      }
    });
  }

  const show = () => {
    console.log(_root.shadowRoot.querySelector('dialog'));
    _root.shadowRoot.querySelector('dialog').showModal();
  }

  const close = () => {
    _root.shadowRoot.querySelector('dialog').close();
  }

  return Object.freeze({
    ..._web_component,
    effects,
    show,
    close
  })
}

define_component({
  name: 'v-dialog',
  component: dialog,
  template
});
