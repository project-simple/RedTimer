const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fileName = 'RedTimer';
module.exports = (function () {
	var config = {
		mode:'none',
		entry : {},
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
	config.entry[fileName] = `./src/${fileName}.js`;
	config.entry[fileName+'.min'] = `./src/${fileName}.js`;
	return config
})();