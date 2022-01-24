module.exports = {
    configureWebpack: config => {
        config.externals = {
            'better-sqlite3': 'commonjs better-sqlite3'
        };
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
                ]
            },
            externals: ['better-sqlite3'],
        }
    }
}