import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

module.exports = <webpack.Configuration>{
  entry: './src/index.ts',
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
