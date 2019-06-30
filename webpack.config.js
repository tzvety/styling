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
                    { loader: 'style-loader' }, // Adds CSS to the DOM by injecting a `<style>` tag
                    { loader: 'css-loader' }, // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    { 
                        loader: 'postcss-loader', // Loader for webpack to process CSS with PostCSS
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    { loader: 'sass-loader' } // Loads a SASS/SCSS file and compiles it to CSS
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
            }
        ]
    }
};
