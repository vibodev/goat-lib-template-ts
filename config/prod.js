const path = require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 对babel的配置，内容同.babelrc文件
const babelOptions = {
	"presets": [
		["env", {
			"targets": {
				"browsers": ["last 2 versions", "safari >= 7"]
			}
		}]
	]
}
module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	output: {
		//The output directory as an absolute path.
		path: path.resolve(__dirname, '../dist'),
    filename: 'Goat.min.js',
    libraryTarget:'umd',
    library:'goat'
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
  },
  externals: {
    'pixi.js': 'PIXI'
  },
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [
				{ loader: 'babel-loader', options: babelOptions },
				{ loader: 'awesome-typescript-loader' }
			]
		}]
	},
	devtool: 'cheap-module-source-map',
	plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')])
  ]
}
