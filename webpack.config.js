let webpack = require('webpack');
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let extractTextWebpackPlugin= require('extract-text-webpack-plugin');

module.exports = (env,argv) =>{

    let isProd = argv.mode.toLowerCase() === 'production';
    let devtool ='eval-source-map'; 
    if(isProd) {
        devtool='source-map'; 
    }

    let extractSass = new extractTextWebpackPlugin({
        filename:'css/[name].[hash].css',
        allChunks: true,
    })
    
return ({    
    entry:{
        main:['./src/main.ts','./src/style/app.scss'],
        polyfills:'./src/polyfills.js',
        vendor:'./src/vendor.js'
    },
    resolve:{
        extensions:['.ts','.js','.html','.json','.css','.scss','.sass']
    },
    output:{
        path:__dirname+'/dist',
        filename:'scripts/[name].[hash].min.js'
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
            },
            {
                test:/\.(scss|sass)$/,
                use:extractSass.extract({
                    use:[
                        {
                            loader:'css-loader'
                        }, {
                            loader:'sass-loader'
                        }
                    ],
                    fallback:'style-loader'
                })
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'mode':JSON.stringify(argv.mode)
            }
        }),
        new htmlWebpackPlugin({
            title:'base',
            template:'./src/public/index.html',
            chunksSortMode:'dependency'
        }),
        //plugin to remove the warnings coming to console while running the app
        /* sample of warning
         *  VM22 client:141 [WDS] Warnings while compiling.
            warnings @ VM22 client:141
            21:58:34.333 VM22 client:147 ./node_modules/@angular/core/esm5/core.js
            6558:15-29 Critical dependency: the request of a dependency is an expression
            @ ./node_modules/@angular/core/esm5/core.js
            @ ./src/vendor.js
            @ multi (webpack)-dev-server/client?http://localhost:9090 ./src/vendor.js
        */
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, root('./src')),
        extractSass
    ],
    devtool:devtool,
    devServer:{
        port:'9090',
        quiet:false,
        open:true,
        stats:'normal'
    }

});


}

function root(args) { 
    args = Array.prototype.slice.call(arguments,0);
    return path.join.apply(path,[__dirname].concat(args));
}
