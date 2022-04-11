import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

module.exports = <webpack.Configuration>{
  entry: './src/index.ts',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
