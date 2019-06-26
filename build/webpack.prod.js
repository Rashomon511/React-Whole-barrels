const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",  // 只要在生产模式下， 代码就会自动压缩
    devtool:"cheap-module-source-map",
    entry: {
        main: './src/index.js'
    },  
    module: {},
    plugins: [],
    output: {}
}

module.exports = merge.smart(commonConfig, prodConfig)