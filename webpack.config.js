const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
	mode: 'none',
	entry: {
		"RedTimer": './src/RedTimer.js',
		"RedTimer.min": './src/RedTimer.js'
	},
	output: {
		library: 'RedTimer',
		libraryTarget: "umd",
		libraryExport: "default",
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this",
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		namedModules: true,
		mangleWasmImports: true,
		minimize: true,
		minimizer: [new UglifyJsPlugin({
			include: /\.min\.js$/,
			uglifyOptions: {
				compress: {
					drop_console: true
				}
			}
		})]
	}
};