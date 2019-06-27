const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const ConnectHistoryApiFallback = require('connect-history-api-fallback');
const config = require('./webpack.dev.js');

const complier = webpack(config);   // 编译器，编译器执行一次就会重新打包一下代码
const app = express();  // 生成一个实例
const DIST_DIR = path.resolve(__dirname, '../', 'dist');  // 设置静态访问文件路径

let devMiddleware = webpackDevMiddleware(complier, {
    quiet: true,
    stats: 'minimal'
})

let hotMiddleware = webpackHotMiddleware(complier, {
    log: false,
    heartbeat: 2000
})
app.use(ConnectHistoryApiFallback());
app.use(devMiddleware)

app.use(hotMiddleware)

// 设置访问静态文件的路径
app.use(express.static(DIST_DIR))

app.listen(8081, () => {
    console.log("成功启动：localhost:" + 8081)
})  //监听端口