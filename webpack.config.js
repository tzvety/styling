const path = require('path');
const pages = require('./dev/pages');


module.exports = {
  mode: 'none',
  entry: './dev/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    publicPath: '/', // Live-reload
    contentBase: 'dist/', // Relative directory for base of server
    inline: true,
    port: 3000,
    historyApiFallback: true
  },

  plugins: [...pages.generatePages(path.resolve(__dirname, path.join(__dirname, './dev/views')))],

  module: {
    
    rules: [

      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};