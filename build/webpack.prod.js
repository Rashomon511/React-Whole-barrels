const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",  // 只要在生产模式下， 代码就会自动压缩
    devtool:"cheap-module-source-map",
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
		})
    ],
    output: {
        filename: '[name].[contenthash].js',  // entry对应的key值
        chunkFilename: '[name].[contenthash].js',  // 间接引用的文件会走这个配置
    },
}

module.exports = merge.smart(commonConfig, prodConfig)