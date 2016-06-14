# hls.js Source Handler for video.js
Play back HLS with [video.js](https://github.com/videojs/video.js), even where it's not natively supported. Using [Dailymotion's hls.js](https://github.com/dailymotion/hls.js) tech.
This bundled plugin is **replacing** the original [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)

## Installation
### NPM
To install `videojs-contrib-hls.js` with npm run

```bash
npm install --save videojs-contrib-hls.js
```

### CDN
Get the latest stable version from the [CDN](https://storage.googleapis.com/edge.peer5.com/videojs-contrib-hls.js/1.0.0/videojs-contrib-hlsjs.js)

### Releases
Download a release of [videojs-contrib-hls](https://github.com/peer5/videojs-contrib-hls.js/releases)

## Getting Started
Get a copy of [videojs-contrib-hls](#installation) and include it in your page along with video.js:

```html
<video id=player width=600 height=300 class="video-js vjs-default-skin" controls>
  <source src="https://example.com/index.m3u8" type="application/x-mpegURL">
</video>
<script src="video.js"></script>
<script src="videojs-contrib-hlsjs.js"></script>
<script>
  var player = videojs('#player');
</script>
```