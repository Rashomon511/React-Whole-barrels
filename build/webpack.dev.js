const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: 'development',      // 模式，表示dev环境
    devtool: "cheap-module-eval-source-map",
    entry: {                  // 入口文件
        //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js']
    },
    optimization: {   // 开发环境时使用
        usedExports: true
    },
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'less-loader', 'postcss-loader']
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },]
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
    plugins: [                     // 插件
        new webpack.NamedModulesPlugin(),  //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
        new webpack.optimize.ModuleConcatenationPlugin(), // 运行 tree shaking 需要 ModuleConcatenationPlugin。通过 mode: "production" 可以添加此插件。如果你是开发环境就需要手动添加
        new OpenBrowserPlugin({ url: 'http://localhost:8081' }), // 自动打开浏览器
    ],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	}
}

module.exports = merge.smart(commonConfig, devConfig)