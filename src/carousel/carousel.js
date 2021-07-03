// import { html, state, web_component, define_component } from "/@melhosseiny/sourdough/src/index.mjs";

const template = (data) => html`
  <div class="carousel">
    <slot class="items"></slot>
    <button class="prev"><i class="md-icon">keyboard_arrow_left</i></button>
    <button class="next"><i class="md-icon">keyboard_arrow_right</i></button>
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
  .carousel {
    /* border: 1px solid cyan; */
    --item-size: 170px;
    --item-gap: 8px;
    --item-count: 1;
    position: relative;
    width: 100%;
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
    --item-width: calc(100% / var(--item-count) - (var(--item-gap) / var(--item-count)) * (var(--item-count) - 1));
    margin-right: var(--item-gap);
    flex: 0 0 var(--item-width);
    width: var(--item-width);
  }

  ::slotted(:nth-child(n+1)) {
    /* border: 1px solid red; */
    /* scroll-snap-align: center; */
    /* scroll-snap-stop: always; */
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
    min-width: var(--line-height-body);
  }

  .prev {
    left: 4px;
  }

  .next {
    right: 4px;
  }

  nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  .position {
    width: 8px;
    height: 8px;
    margin-right: 4px;
    background-color: #a8a8a8;
    border-radius: 50%;
  }

  .position.active {
    background-color: rgb(var(--primary-color));
  }
`

export function carousel(spec) {
  let { _root } = spec;
  const _web_component = web_component(spec);
  const _state = _web_component.state;

  //console.log(spec._root.shadowRoot);
  let carousel, items;
  let observer;

  const init = () => {
    _state.active = 0;
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

  const effects = () => {
    carousel = _root.shadowRoot.querySelector(".carousel");
    items = _root.shadowRoot.querySelector(".items");
    spec.cards = items.assignedElements();
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
  }

  const wrap_index = (index, n) => {
    console.log('wrap_index', index);
    return index >= 0 ? index % n : 0;
  }

  const goto_slide = (index) => {
    console.log('goto_slide', index);
    const card_index = index;

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

    console.log('cardIndex', card_index);
    console.log(spec.cards[card_index].offsetLeft, spec.cards[card_index].offsetWidth);

    goto_slide(card_index);

    prev_btn.disabled = false;
    next_btn.disabled = false;
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
  name: 'v-carousel',
  component: carousel,
  template,
  style,
  props: ['snap-align', 'number-of-items']
});
