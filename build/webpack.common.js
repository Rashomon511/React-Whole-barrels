const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const plugins = [
    new WebpackBar(),        // webpack打包进度条
    new FriendlyErrorsWebpackPlugin(), // 能够更好在终端看到webapck运行的警告和错误
    new HtmlWebpackPlugin({   // 向dist文件中自动添加模版html
        template: 'src/index.html',
    }),
    new CleanWebpackPlugin({
        root: path.resolve(__dirname, '../dist'),
        verbose: true,
        dry: false
    }), // 打包后先清除dist文件，先于HtmlWebpackPlugin运行
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((file) => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({    // 将dll.js文件自动引入html
			filepath: path.resolve(__dirname, '../dll', file),
		}));
	}
	if (/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({    // 当打包第三方库时，会去manifest.json文件中寻找映射关系，如果找到了那么就直接从全局变量(即打包文件)中拿过来用就行，不用再进行第三方库的分析，以此优化打包速度
			manifest: path.resolve(__dirname, '../dll', file),
		}));
	}
});

const commonConfig = {
    resolve: {
        extensions: ['.ts', '.tsx','.js', '.jsx'], // 当通过import child from './child/child'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
        mainFiles: ['index', 'view'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件，如果不存在再去找view开头的文件
        // alias: {
        //     home: path.resolve(__dirname, '../src/home') // 配置别名可以加快webpack查找模块的速度, 引入home其实是引入../src/home
        // }
    },
    module: {                 // 让 webpack 能够去处理那些非 JavaScript 文件
        rules: [{
            test: /\.js$/,    // 注意这里要写正确，不然useBuiltIns不起作用
            exclude: /node_modules/, // 排除node_modules中的代码
            use: [{
                loader: 'babel-loader', // 只是babel和webpack之间的桥梁，并不会将代码转译
            }]
        },
        {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		},
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]', // placeholder 占位符
                    outputPath: 'images/', // 打包文件名
                    limit: 204800, // 小于200kb则打包到js文件里，大于则打包到imgages里
                },
            },
        },
        {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].min.[ext]',
                    outputPath: 'fonts/',
                    limit: 5000,
                }
            },
        }]
    },
    plugins,
    performance: {
        hints: false
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}

module.exports = commonConfig;
