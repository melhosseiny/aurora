import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <article>
    <figure>
      <slot name="media"></slot>
      <figcaption>
        <header>
          <slot name="thumbnail"></slot>
          ${data['title-label'] || data['subtitle-label'] ? `<hgroup>
            ${data['title-label'] ? `<h1 part="title" class="title type--body">${data['title-label']}</h1>` : ''}
            ${data['subtitle-label'] ? `<h2 part="subtitle" class="subtitle type--body">${data['subtitle-label']}</h2>` : ''}
          </hgroup>` : ''}
        </header>
        <slot part="text" name="text"></slot>
        <slot name="actions"></slot>
      </figcaption>
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
    flex-direction: column;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  @media screen and (min-width: 30em) {
    :host([orientation=horizontal]) article {
      height: 100%;
    }
    :host([orientation=horizontal]) figure {
      flex-direction: row;
      align-items: stretch;
      height: 100%;
    }
    :host([orientation=horizontal]) slot[name=media]::slotted(*){
      flex: 1;
    }
    :host([orientation=horizontal]) figure figcaption {
      flex: 1;
      margin: 0 8px;
    }
  }

  figure figcaption header {
    display: flex;
    margin-bottom: 8px;
  }
  
  figure figcaption hgroup {
    min-width: 0;
  }

  slot[name=media]::slotted(*) {
    overflow: hidden;
    display: block;
    transition: border-width 0.1s ease;
    box-sizing: border-box;
  }

  slot[name=thumbnail]::slotted(*) {
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
  props: ['title-label', 'subtitle-label', 'orientation']
});
