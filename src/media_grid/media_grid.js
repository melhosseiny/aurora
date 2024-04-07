import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

function get_chunks(arr, n) {
  const chunks = new Array(n);
  for (let i = 0; i < chunks.length; i++) {
    chunks[i] = [];
  }
  console.log(chunks);
  let col = 0;
  for (let i = 0; i < arr.length; i++) {
    console.log(i, col, chunks[0] === chunks[1]);
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

  const init = () => {
    const elements = _root.shadowRoot.querySelector(".items").assignedElements();
    cols = matchMedia("screen and (max-width: 38em)").matches ? 3 : 5;
    _state.chunks = get_chunks(elements, cols);
    console.log("ITEMS", elements);
    console.log("CHUNKS", get_chunks(elements, cols));
  }
  
  const adjust_cols = () => {
    const elements = _root.shadowRoot.querySelector(".items").assignedElements();
    cols = matchMedia("screen and (max-width: 38em)").matches ? 3 : 5;
    _state.chunks = get_chunks(elements, cols);
  }

  const effects = () => {
    window.addEventListener("resize", adjust_cols);
  }

  const cleanup_effects = () => {
    window.removeEventListener("resize", adjust_cols);
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
  style
});
