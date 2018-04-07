let webpack = require('webpack');
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({
    entry:{
        main:'./src/main.ts',
        polyfills:'./src/polyfills.js',
        vendor:'./src/vendor.js'
    },
    resolve:{
        extensions:['.ts','.js','.html','.json','.css','.scss','.sass']
    },
    output:{
        path:__dirname+'/dist',
        filename:'[name].[hash].min.js'
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                loaders:['ts-loader','angular2-template-loader']
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }
        ]

    },
    plugins:[
        new htmlWebpackPlugin({
            title:'base',
            template:'./src/public/index.html',
            chunksSortMode:'dependency'
        })
    ],
    devServer:{
        port:'9090',
        quiet:false,
        open:true,
        stats:'normal'
    }

});

let root = function(path){

}



