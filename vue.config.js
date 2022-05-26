const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.entry('print').add('./src/print.js').end();
        config.plugin('html').tap((args) => {
            args[0].excludeChunks = ['print']
            return args
        })
    },

    configureWebpack: {
        externals: {
            'better-sqlite3': 'commonjs better-sqlite3'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'print.html',
                template: 'public/print.html',
                chunks: ['runtime', 'chunk-vendors', 'print']
            })
        ],
        /*devServer: {
            writeToDisk: true,
        },*/
        optimization: {
            // don't minimize so we can debug
            minimize: false,
            /*
              The value 'single' instead creates a runtime file to be shared for all generated chunks.
              https://github.com/webpack/webpack-dev-server/issues/2792
            */
            runtimeChunk: 'single'
        },
    },

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "productName": "warehouse",
                "appId": "warehouse.id",
                "win": {
                    "target": ["portable"]
                },
                "portable": {
                    "artifactName": "warehouse_portable.exe"
                },

                files: [
                    "**/*",

                ],
                extraFiles: [
                    {
                        "from": "./db",
                        "to": "./db",
                        "filter": ["**/*"]
                    },
                    {
                        "from": "./help",
                        "to": "./help",
                        "filter": ["**/*"]
                    },
                ],
            },
            externals: ['better-sqlite3'],
        }
    },

    transpileDependencies: [
        //'vuetify'
    ]
}
