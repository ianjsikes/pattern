module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  target: 'electron-main',
  module: {
    loaders: [],
  },
}
