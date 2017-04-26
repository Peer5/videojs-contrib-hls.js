'use strict';

module.exports = {
    entry: __dirname + '/src/videojs5.hlsjs',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'videojs-contrib-hlsjs.min.js'
    },
    externals: [{
        'video\.js': 'commonjs video.js'
    }]
};
