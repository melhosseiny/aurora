# Aurora

UI component library for web projects

| Component        | Status      | Tests |
|------------------|-------------|-------|
| typography       | Beta        |       |
| button           | Beta        |       |

## `typography`

- Use a basic reset to ensure consistency, remove `margin` and `padding`
- Turn on common ligatures, old-style numerals and kerning
- Use lining numerals in headings
- Use proper subscripts `sub` and superscripts `sup`
- Use real small caps for abbreviations `abbr`
- Set a comfortable reading measure (`38em`) for paragraphs `p` and blockquotes `blockquote`
- Turn on automatic hyphenation for `p`
- Indent and italicize text in `blockquote` and hang punctuation using a class `.quoted`
- Indent list items `li` by multiples of the line height
- Use CSS counters in numbered lists `ol` to allow hanging numbers in the margin
- Remove underline from links except when they're hovered or active and skip descenders
- Use `--primary-color` for links and `--accent-color` for visited links

### Custom props

- `--type-body`: body font
- `--type-display`: display font
- `--background-color`: `body` background color
- `--text-color`: `body` text color
- `--primary-color`
- `--accent-color`
