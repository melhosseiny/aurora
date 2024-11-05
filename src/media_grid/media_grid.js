import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

function get_chunks(arr, n) {
  const chunks = new Array(n);
  for (let i = 0; i < chunks.length; i++) {
    chunks[i] = [];
  }
  let col = 0;
  for (let i = 0; i < arr.length; i++) {
    chunks[col].push(arr[i]);
    col = (col + 1) % n;
  }
  return chunks;
}

const template = (data) => html`
  <div>
    <slot class="items"></slot>
    <div class="media-grid" ref="chunks">
      ${ data.chunks && data.chunks.length > 0
        ? data.chunks.map(
          (chunk) => {
            return `<div class="media-grid-column">
              ${ chunk.map(item => item.outerHTML).join('') }
            </div>`
          }
        ).join(''): ''
      }
    </div>
  </div>
`
const style = `
  :host {
    --cols: 5;
    display: block;
  }
  
  .items {
    display: none;
  }

  .media-grid {
    display: grid;
    align-items: start;
    column-gap: 32px;
    grid-template-columns: repeat(var(--cols), minmax(0px, 1fr));
  }

  .media-grid-column {
    display: grid;
    row-gap: 32px;
    grid-template-columns: minmax(0px, 1fr);
  }

  .media-grid-column > *, .media-grid-column img {
    width: 100%;
  }
  
  @media screen and (max-width: 38em) {
    :host {
      --cols: 3;
    }
  }
`

export function media_grid(spec) {
  let { _root } = spec;
  const _web_component = web_component(spec);
  const _state = _web_component.state;
  
  let cols;
  const media = matchMedia("screen and (max-width: 38em)");

  const init = () => {
    adjust_cols();
  }
  
  const adjust_cols = () => {
    const cols_sm = Number(spec['cols-sm']) || 3;
    const cols_lg = Number(spec['cols-lg']) || 5;
    const elements = _root.shadowRoot.querySelector(".items").assignedElements();
    cols = media.matches ? cols_sm : cols_lg;
    (_root.shadowRoot.host).setAttribute("style", `--cols: ${cols}`);
    _state.chunks = get_chunks(elements, cols);
  }
  
  const handle_media_change = (event) => {
    if (document.fullscreenElement) {
      return;
    }
    adjust_cols();
  }

  const effects = () => {
    media.addEventListener("change", handle_media_change);
  }

  const cleanup_effects = () => {
    media.removeEventListener("change", handle_media_change);
  }

  return Object.freeze({
    ..._web_component,
    init,
    effects,
    cleanup_effects
  })
}

define_component({
  name: "ad-media-grid",
  component: media_grid,
  template,
  style,
  props: ["cols-lg", "cols-sm"]
});
