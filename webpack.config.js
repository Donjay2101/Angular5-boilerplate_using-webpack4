let webpack = require('webpack');
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let extractTextWebpackPlugin= require('extract-text-webpack-plugin');
let boostrapConfig = require('././webpack.bootstrap.config.js');
module.exports = (env,argv) =>{

    let isProd = argv.mode.toLowerCase() === 'production';
    let devtool ='eval-source-map'; 
    if(isProd) {
        devtool='source-map'; 
    }

    let extractSass = new extractTextWebpackPlugin({
        filename:'css/[name].[hash].css',
        allChunks: true,
    });


    let bootstrap = isProd ? boostrapConfig.prod : boostrapConfig.dev; 
    
return ({    
    entry:{
        main: ['./src/main.ts','./src/style/app.scss'],
        polyfills: './src/polyfills.js',
        vendor: './src/vendor.js',
        bootstrap: bootstrap
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
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|tts|eot|ico|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders:['file-loader?name=fonts/[name].[hash].[ext]?', 'url-loader?limit=10000'] 
            },
            { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
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
        extractSass,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Popper: ['popper.js', 'default'],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        })
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
