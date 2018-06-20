const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');


module.exports = {  
  entry:{ 
    index:'./src/index.js'
  },
  output: {
    path: __dirname + '/static/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
  "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
        },
        exclude: /node_modules/
      },
      { test: /\.(png|jpg)$/, 
     exclude: /node_modules/,
      loader: 'url-loader' },
    
  {
                test: /\.svg/,
                exclude: /node_modules/,
                    loader: 'svg-url-loader'                
            },
            {  
        test: /\.css$/,
        exclude: /node_modules/,
         use: [
    {
      loader: "style-loader"
    },
     { loader: 'css-loader', options: { minimize: true } }  ]
        
      }
    ]
  },
  plugins: [
  ]
};
