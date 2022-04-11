import webpack from 'webpack'

module.exports = <webpack.Configuration>{
  entry: './src/index.ts',
	stats: 'minimal',
}
