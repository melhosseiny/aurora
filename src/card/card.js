import { html, state, web_component, define_component } from "/@melhosseiny/sourdough/src/index.mjs";

const template = (data) => html`
  <article>
    <figure>
      <slot name="media"></slot>
      <figcaption>
        <slot name="thumbnail"></slot>
        <div>
          ${data.title ? `<h1 class="type--body">${data.title}</h1>` : ''}
          ${data.subtitle ? `<h2 class="type--body">${data.subtitle}</h2>` : ''}
        </div>
      </figcaption>
      <slot name="text"></slot>
      <slot name="actions"></slot>
    </figure>
  </article>
`

const style = `
  figure {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  figcaption {
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  slot[name=thumbnail]::slotted(picture) {
    overflow: hidden;
    display: block;
    margin-right: 8px;
    height: calc(var(--line-height-body) * 2);
    width: calc(var(--line-height-body) * 2);
  }

  slot[name=media]::slotted(picture) {
    overflow: hidden;
    display: block;
    transition: border-width 0.1s ease;
    box-sizing: border-box;
  }

  h1, h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color);
    margin: 0;
  }
`

export function card(spec) {
  let { _root } = spec;
  const _state = state(spec);
  const _web_component = web_component(spec);

  const init = () => {}

  const effects = () => {}

  return Object.freeze({
    ..._web_component
  })
}

define_component({
  name: 'v-card',
  component: card,
  template,
  style,
  props: ['img', 'img-title', 'title', 'subtitle']
});
