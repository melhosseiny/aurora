import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <article>
    <figure>
      <slot name="media"></slot>
      <figcaption>
        <slot name="thumbnail"></slot>
        <div>
          ${data.title ? `<h1 part="title" class="title type--body">${data.title}</h1>` : ''}
          ${data.subtitle ? `<h2 part="subtitle" class="subtitle type--body">${data.subtitle}</h2>` : ''}
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

  figure figcaption {
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  figure figcaption div {
    flex: 1;
    min-width: 0;
  }

  slot[name=media]::slotted(picture) {
    overflow: hidden;
    display: block;
    transition: border-width 0.1s ease;
    box-sizing: border-box;
  }

  slot[name=thumbnail]::slotted(picture) {
    overflow: hidden;
    display: block;
    margin-right: 8px;
    height: calc(var(--line-height-body) * 2);
    width: calc(var(--line-height-body) * 2);
  }

  .title, .subtitle {
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
  name: 'ad-card',
  component: card,
  template,
  style,
  props: ['img', 'img-title', 'title', 'subtitle']
});
