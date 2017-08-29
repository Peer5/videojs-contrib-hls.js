'use strict';

module.exports = {
  entry: __dirname + '/src/videojs.hlsjs',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'videojs-contrib-hlsjs.min.js',
    libraryTarget: 'umd'
  },
  externals: {
    'video\.js': {
      commonjs: 'video.js',
      commonjs2: 'video.js',
      amd: 'video.js',
      root: 'videojs'
    }
  }
};
