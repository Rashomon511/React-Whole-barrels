const path = require('path');

module.exports  = {
    mode: 'development',      // 模式，表示dev环境
    entry: './src/index.js',  // 入口文件
    module: {},               // 让 webpack 能够去处理那些非 JavaScript 文件
    plugins: [],              // 插件
    output: {
        filename: 'bundle.js',  // 打包后文件名称
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}

