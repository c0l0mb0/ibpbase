const path = require('path');

module.exports = {
    mode:'development',
    entry: path.resolve(__dirname, './resources/js/ibp_table/app.js'),
    output: {
        filename: 'ibp-table.js',
        environment: {
            arrowFunction: false,
        },
        clean: true,
        path: path.resolve(__dirname, './public/js/ibp_table'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {babelrc: true}
            }
        ]
    }

};
