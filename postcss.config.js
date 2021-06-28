module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-modules': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'font-variant-property': false
      }
    },
    'cssnano': {
      preset: 'default'
    }
  }
}
