const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/index.js',
    './client/assets/css/style.css'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    })
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ 'env', 'es2015', 'stage-3', 'react' ],
            plugins: [
              require('babel-plugin-transform-es2015-computed-properties')
            ]
          }
        }]
      },
			{
				test: /\.css$/,
        use: [ 'css-hot-loader' ].concat([
          {
            loader: 'file-loader',
            options: {
							name: 'bundle.css'
						}
          }
        ])
			},
    ]
  },
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	port: 3000
	// }
}
