const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const prodMode = !devMode;

const relPublicPath = path.relative(path.join(__dirname, 'dist', 'styles'), path.join(__dirname, 'dist'));

const filename = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`;
const fileLoader = assetType => ({
        loader: 'file-loader',
        options: {
            name: prodMode ? '[name].[hash].[ext]' : '[name].[ext]',
            outputPath: assetType,
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
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'assets', 'favicon.png'),
        //             to: path.resolve(__dirname, 'dist')
        //         }
        //     ]
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: relPublicPath,
                    }
                }, 'css-loader'],
            }, 
            {
                test: /\.(png|svg|jpe?g|gif)/,
                use: fileLoader('assets')
            },
            {
                test: /\.(ttf|woff2?|eot)/,
                use: fileLoader('fonts'),
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
