import fs from 'fs';

/* scale: f0=16, r=1.618, i=2
 n fn s m l
-2 10
-1 13
 0 16 4
 1 20 3 4
 2 26 2 3 4
 3 33 1 2 3
 4 42   1 2
 5 53     1
 6 68
 7 86
*/

const _f0 = 16;
const _r = 1.618;
const _i = 2;

const logn = (x, n) => Math.log(x) / Math.log(n);
const fi = (n, f0 = _f0, r = _r, i = _i) => Math.round(f0 * (r ** (n/i)));
const ni = (fi, f0 = _f0, r = _r, i = _i) => Math.round(logn((fi / f0), r) * i);

const scale = []
for (let n = 0; n < 8; n++) {
  console.log(n, fi(n), ni(fi(n)));
  scale.push(n);
}

const gridTemplate = (sm, md, lg) => `
html {
  font-size: ${_f0}px;
}

:global(#grid) {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(238,0,0,0.5) 1px, transparent 1px);
  background-size: 100% ${fi(sm)}px;

  @media (--gt-md-viewport) {
    background-size: 100% ${fi(md)}px;
  }

  @media (--gt-lg-viewport) {
    background-size: 100% ${fi(lg)}px;
  }
}`

const template = (i0, l) => `
  h1 {
    font-size: ${fi(i0+3) / _f0}rem;
    line-height: ${fi(l) / fi(i0+3) < 1 ? 2 * fi(l) / fi(i0+3) : fi(l) / fi(i0+3)};
    margin-top: ${fi(l) / fi(i0+3)}em;
  } /* ${fi(i0+3)}px */
  h2 {
    font-size: ${fi(i0+2) / _f0}rem;
    line-height: ${fi(l) / fi(i0+2)};
  } /* ${fi(i0+2)}px */
  h3 {
    font-size: ${fi(i0+1) / _f0}rem;
    line-height: ${fi(l) / fi(i0+1)};
  } /* ${fi(i0+1)}px */
  body, p, h4, h5, h6 {
    font-size: ${fi(i0) / _f0}rem;
    line-height: ${fi(l) / fi(i0)};
  } /* ${fi(i0)}px */
  p, blockquote {
    margin-bottom: ${fi(l) / fi(i0)}em;
  }
`

const rhythm = (grid = false) => `
${grid ? gridTemplate(1, 2, 2) : ''}
${template(0, 1)}
@media (--gt-md-viewport) {
  ${template(1, 2)}
}

@media (--gt-lg-viewport) {
  ${template(2, 2)}
}`

console.log(rhythm());

fs.writeFile('rhythm.css', rhythm(), err => {
  if (err) return console.log(err);
  console.log('> rhythm.css');
});
