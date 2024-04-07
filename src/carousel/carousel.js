import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const template = (data) => html`
  <div class="carousel">
    <slot part="items" class="items"></slot>
    <button class="prev" aria-label="previous">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13.6914 17.8906">
       <g>
        <rect height="17.8906" opacity="0" width="13.6914" x="0" y="0"/>
        <path d="M0 8.94043C0 9.42383 0.170898 9.81934 0.576172 10.2148L7.95898 17.4414C8.25684 17.7441 8.61328 17.8857 9.03809 17.8857C9.90723 17.8857 10.6152 17.1875 10.6152 16.333C10.6152 15.8984 10.4297 15.5029 10.1074 15.1855L3.67188 8.93555L10.1074 2.69531C10.4346 2.37305 10.6152 1.97754 10.6152 1.55273C10.6152 0.693359 9.90723 0 9.03809 0C8.6084 0 8.25684 0.141602 7.95898 0.439453L0.576172 7.66602C0.175781 8.05664 0.00488281 8.45215 0 8.94043Z" fill="currentColor" fill-opacity="0.85"/>
       </g>
      </svg>
    </button>
    <button class="next" aria-label="next">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12.9785 17.8906">
        <g>
        <rect height="17.8906" opacity="0" width="12.9785" x="0" y="0"/>
        <path d="M12.9785 8.94043C12.9688 8.45215 12.7979 8.05664 12.3975 7.66602L5.01953 0.439453C4.7168 0.141602 4.36523 0 3.93066 0C3.07129 0 2.36328 0.693359 2.36328 1.55273C2.36328 1.97754 2.53906 2.37305 2.86621 2.69531L9.30176 8.93555L2.86621 15.1855C2.54395 15.5029 2.36328 15.8984 2.36328 16.333C2.36328 17.1875 3.07129 17.8857 3.93066 17.8857C4.35547 17.8857 4.7168 17.7441 5.01953 17.4414L12.3975 10.2148C12.8027 9.81934 12.9785 9.42383 12.9785 8.94043Z" fill="currentColor" fill-opacity="0.85"/>
        </g>
      </svg>
    </button>
    <nav ref="cards active">
      ${ data.cards
        ? data.cards.map(
          (element, index) => {
            return `<span data-goto="${index}" class="position${ data.active === index ? ' active' : '' }"></span>`
          }
        ).join(''): ''
      }
    </nav>
  </div>
`

const style = `
  :host {
    display: block;
    position: relative;
  }

  .carousel {
    /* border: 1px solid cyan; */
    --item-gap: 8px;
    --item-count: 1;
    position: relative;
    width: 100%;
  }
  
  .carousel[data-static] .prev, .carousel[data-static] .next, .carousel[data-static] nav {
    display: none;
  }

  .items {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }

  .items::-webkit-scrollbar {
    display: none;
  }

  ::slotted(*) {
    --item-width: calc((100% / var(--item-count)) - (var(--item-gap) / var(--item-count)) * (var(--item-count) - 1));
    margin-right: var(--item-gap);
    flex: 0 0 var(--item-width);
    width: var(--item-width);
  }
  
  :host([snap-stop=always]) ::slotted(:nth-child(n+1)) {
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  ::slotted(:last-child) {
    margin-right: 0;
  }

  .prev, .next {
    --button-color: var(--background-color);
    position: absolute;
    top: calc(50% - var(--line-height-body) / 2);
    align-items: center;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 50%;
    margin: 0;
    padding: 0;
    width: var(--line-height-body);
    height: var(--line-height-body);
  }
  
  .prev svg, .next svg {
    width: 8px;
  }

  .prev {
    left: 4px;
  }

  .next {
    right: 4px;
  }

  nav {
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  .position {
    cursor: pointer;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    background-color: rgba(0,0,0,0.12);
    border-radius: 50%;
  }

  .position.active {
    background-color: rgba(0,0,0,0.24);
  }
  
  :host([mode=story]) nav {
    top: 6px;
    bottom: auto;
    left: 4px;
    right: 4px;
  }

  :host([mode=story]) .items {
    padding-top: 1em;
  }
  
  :host([mode=story]) .position {
    flex: 1;
    height: 4px;
    border-radius: 0;
  }

  :host([mode=story]) .position.active {
    flex: 1;
    height: 4px;
    border-radius: 0;
  }
`

export function carousel(spec) {
  let { _root } = spec;
  const _web_component = web_component(spec);
  const _state = _web_component.state;

  //console.log(spec._root.shadowRoot);
  let carousel, items;
  let observer;
  let max_height = 0;

  const init = () => {
    _state.active = 0;
    _root.shadowRoot.querySelector(".carousel").style = `--item-count: ${+spec['number-of-items']}`;
    if (+spec['number-of-items'] === 1) {
      console.log(spec);
    }
    //_state.has_prev = true;
    //_state.has_next = true;
  }

  const handlePrevBtnClick = () => { change_slide(-1); }
  const handleNextBtnClick = () => { change_slide(1); }
  const handlePositionClick = (event) => {
    goto_slide(+event.target.dataset.goto);
  }
  
  const handle_scroll = () => {
    console.log("scroll");
    clearTimeout(window.scrollEndTimer);
    window.scrollEndTimer = setTimeout(handle_scrollend, 100)
  }
  
  const handle_scrollend = () => {
    console.log("scrollend");
    _root.shadowRoot.querySelector(".prev").disabled = false;
    _root.shadowRoot.querySelector(".next").disabled = false;

    const most_visible_card = spec.cards.reduce((a, b) => a.dataset.visibility > b.dataset.visibility ? a : b);
    console.log(most_visible_card);
    _state.active = spec.cards.indexOf(most_visible_card);
  }

  const effects = () => {
    carousel = _root.shadowRoot.querySelector(".carousel");
    items = _root.shadowRoot.querySelector(".items");
    spec.cards = items.assignedElements();
    if (spec.cards.length <= spec['number-of-items']) {
      carousel.dataset.static = "data-static";
    }
    const prev_btn = _root.shadowRoot.querySelector(".prev");
    const next_btn = _root.shadowRoot.querySelector(".next");
    const positions = _root.shadowRoot.querySelectorAll(".position");

    if (prev_btn) { prev_btn.addEventListener("click", handlePrevBtnClick) }
    if (next_btn) { next_btn.addEventListener("click", handleNextBtnClick) }
    positions.forEach(position => position.addEventListener("click", handlePositionClick))

    observer = observer ? observer : new IntersectionObserver((cards) => {
      cards.forEach((card, index) => {
        card.target.dataset.visibility = card.intersectionRatio;
      });
    }, {
      root: items,
      threshold: [0.0,0.99],
    });;

    spec.cards.forEach(card => {
      observer.observe(card)
    });
    
    items.addEventListener("scrollend", handle_scrollend);
    items.addEventListener("scroll", handle_scroll);
  }

  const cleanup_effects = () => {
    console.log('cleaning up ...')
    const prev_btn = _root.shadowRoot.querySelector(".prev");
    const next_btn = _root.shadowRoot.querySelector(".next");
    const positions = _root.shadowRoot.querySelectorAll(".position");
    prev_btn.removeEventListener('click', handlePrevBtnClick);
    next_btn.removeEventListener('click', handleNextBtnClick);
    positions.forEach(position => position.removeEventListener('click', handlePositionClick));
    observer.disconnect();
    items.removeEventListener("scrollend", handle_scrollend);
    items.removeEventListener("scroll", handle_scroll);
  }

  const wrap_index = (index, n) => {
    console.log('wrap_index', index);
    return index >= 0 ? index % n : 0;
  }

  const goto_slide = (index) => {
    console.log('goto_slide', index);
    const card_index = index;
    
    console.log("OFFSET_LEFT", spec.cards[card_index], spec.cards[card_index].offsetLeft);

    if (spec['snap-align'] === 'center') {
      items.scrollTo(spec.cards[card_index].offsetLeft + spec.cards[card_index].offsetWidth / 2 - items.offsetWidth / 2, 0);
    } else {
      items.scrollTo(spec.cards[card_index].offsetLeft, 0);
    }
    _state.active = index;
  }

  const change_slide = (delta) => {
    const prev_btn = _root.shadowRoot.querySelector(".prev");
    const next_btn = _root.shadowRoot.querySelector(".next");
    prev_btn.disabled = true;
    next_btn.disabled = true;

    const visible_cards = spec.cards.filter(card => +card.dataset.visibility > 0.99);
    //const partiallyVisibleCards = cards.filter(card => +card.dataset.visibility > 0 && +card.dataset.visibility < 1);

    const visible_indices = visible_cards.map(card => spec.cards.indexOf(card));
    console.log('visibleIndices', visible_indices);

    const card_index = wrap_index(delta > 0
      ? (visible_indices[visible_indices.length - 1] + 1)
      : spec['snap-align'] === 'center'
        ? visible_indices[0] - 1
        : visible_indices[0] - visible_cards.length
    , spec.cards.length);

    if (_state.active === 0 && card_index === 0) {
      prev_btn.disabled = false;
      next_btn.disabled = false;
    }

    console.log('cardIndex', card_index);
    console.log(spec.cards[card_index].offsetLeft, spec.cards[card_index].offsetWidth);

    goto_slide(card_index);
  }

  return Object.freeze({
    ..._web_component,
    init,
    effects,
    cleanup_effects,
    change_slide
  })
}

define_component({
  name: "ad-carousel",
  component: carousel,
  template,
  style,
  props: ["mode", "snap-align", "snap-stop", "number-of-items"]
});
