module.exports = {
  plugins: {
    'postcss-import': {},
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
