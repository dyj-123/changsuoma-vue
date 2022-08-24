
// proxyObj['/'] = {
// //目标地址
//     target: 'http://127.0.0.1:8600',
// //发送请求头中host会设置成target
//     changeOrigin: true,
// //不重写请求地址
//     pathRewrite: {
//         '^/': '/'
//     }
// }
module.exports = {
    publicPath: './',
    devServer:{
      disableHostCheck:true,

    },

    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },

}