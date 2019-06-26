const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const WorkboxPlugin = require('workbox-webpack-plugin');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",  // 只要在生产模式下， 代码就会自动压缩,自动开启tree shaking
    devtool: "cheap-module-source-map",
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            }, 'less-loader', 'postcss-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }]
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new CSSSplitWebpackPlugin({
            size: 4000,
            filename: '[name]-[part].[ext]'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.HashedModuleIdsPlugin(),  //根据模块的相对路径生成一个四位数的hash
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",    // 只对异步引入代码起作用，设置all时并同时配置vendors才对两者起作用
            minSize: 30000,   // 引入的库大于30kb时才会做代码分割
            minChunks: 1,     // 一个模块至少被用了1次才会被分割
            maxAsyncRequests: 5,     // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
            maxInitialRequests: 3,   // 入口文件进行加载时，引入的库最多分割出3个js文件
            automaticNameDelimiter: '~',  // 生成文件名的文件链接符
            name: true,   // 开启自定义名称效果
            cacheGroups: {  // 判断分割出的代码放到哪个文件
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendors: {   // 配合chunks： ‘all’使用，表示如果引入的库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendors.js'
                },
                default: {  // 为非node-modules库中分割出的代码设置默认存放名称
                    priority: -20,
                    reuseExistingChunk: true, // 避免被重复打包分割
                    filename: 'common.js'
                }
            }
        }
    },
    output: {
        filename: '[name].[contenthash].js',  // entry对应的key值
        chunkFilename: '[name].[contenthash].js',  // 间接引用的文件会走这个配置
    },
}

module.exports = merge.smart(commonConfig, prodConfig)