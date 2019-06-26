const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = {
    module: {                 // 让 webpack 能够去处理那些非 JavaScript 文件
        rules: [{
            test: /\.js$/,    // 注意这里要写正确，不然useBuiltIns不起作用
            exclude: /node_modules/, // 排除node_modules中的代码
            use: [{
                loader: 'babel-loader', // 只是babel和webpack之间的桥梁，并不会将代码转译
            }]
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
    plugins: [                     
        new HtmlWebpackPlugin({   // 向dist文件中自动添加模版html
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(), // 打包后先清除dist文件，先于HtmlWebpackPlugin运行
    ],
    output: {
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}

module.exports = commonConfig;
