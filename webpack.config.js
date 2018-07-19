const path =  require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const webpack = require('webpack');

const extractCss = new ExtractTextPlugin({
  filename: 'style.bundle.css'
});

const config = {
    mode: 'production',
    entry: './public/javascripts/main.js',

    output: {
        path: path.join(__dirname,'/public','/dist'),
        filename: 'main.bundle.js',
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname,'/public','/javascripts'),
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['env']
              } 
            }
        },
        {
          test: /\.css$/,
          include: [
              path.join(__dirname,'/public','/stylesheets'),
            ],
          use: extractCss.extract({
            fallback: 'style-loader', 
            use: [ 'css-loader' ]
          })
        }
      ]
    },
    plugins: [
        new cleanWebpackPlugin(['./public/dist']),
        extractCss,
    ],
};
module.exports = config;