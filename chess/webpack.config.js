const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const prodMode = !devMode;


const filename = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`;
const fileLoader = () => ({
        loader: 'file-loader',
        options: {
            name: prodMode ? '[path][name].[hash].[ext]' : '[path][name].[ext]',
        },
});

console.log('\x1b[47m_______________________________________________________________________________\x1b[0m');
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: devMode? 'development' : 'production',
    entry: {
        index: './index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: prodMode,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets', 'favicon.png'),
                    to: path.resolve(__dirname, 'dist', 'assets')
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: './',
                    }
                }, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpe?g|gif)/,
                use: fileLoader()
            },
            {
                test: /\.(ttf|woff2?|eot)/,
                use: fileLoader(),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },

                }
            }
        ]
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
        minimizer: [
            prodMode ? new CssMinimizerPlugin() : `...`,
        ],
    },
    // devtool: devMode? 'source-map' : '',
    devServer: {
        port: 3001,
        open: true,
        hot: devMode,
    },
};
