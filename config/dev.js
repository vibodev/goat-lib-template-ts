const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill', './src/index.ts'],
	output: {
		//The output directory as an absolute path.
		path: path.resolve(__dirname, '../debug'),
    filename: 'Goat.js',
    libraryTarget:'umd',
    library:'goat',
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: {
    'pixi.js': 'PIXI',
    'babel-polyfill': 'window',
    'lodash': '_'
  },
	module: {
    // noParse: [/node_modules\/pixi.js\//],
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ }
		]
	},
	// 使用 source-map
	devtool: 'inline-source-map',
	plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../debug')])
	]
}
