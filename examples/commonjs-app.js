'use strict';

var videojs = require('video.js');
require('videojs-contrib-media-sources'); // increase browser support with MSE polyfill
require('videojs-contrib-hlsjs'); // auto attaches hlsjs handler


window.onload = function() {
  var player = videojs('#player');
};
