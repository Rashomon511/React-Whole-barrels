const path = require('path');

module.exports = {
    mode: 'development',      // 模式，表示dev环境
    entry: './src/index.js',  // 入口文件
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
    module: {                 // 让 webpack 能够去处理那些非 JavaScript 文件
        rules: [{
            test: /\.js$/,    // 注意这里要写正确，不然useBuiltIns不起作用
            exclude: /node_modules/, // 排除node_modules中的代码
            use: [{
                loader: 'babel-loader', // 只是babel和webpack之间的桥梁，并不会将代码转译
            }]
        }]
    },               
    plugins: [],              // 插件
    output: {
        filename: 'bundle.js',  // 打包后文件名称
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}

