const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const plugins = [
    new ExtractTextPlugin({
        filename: 'css/style.css',
    }),
];
const postCssPlugins = isProduction ?
    [autoprefixer('last 2 versions'), cssnano] :
    [autoprefixer('last 2 versions')];

if (isProduction) {
    plugins.push(new UglifyJsPlugin({
        include: /\.js$/,
    }));
}

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => postCssPlugins,
                            },
                        },
                        { loader: 'sass-loader' },
                    ],
                }),
            },
        ],
    },
    plugins,
};
