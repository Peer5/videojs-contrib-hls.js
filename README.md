# hls.js Source Handler for video.js
Play back HLS with [video.js](https://github.com/videojs/video.js), even where it's not natively supported. Using [Dailymotion's hls.js](https://github.com/dailymotion/hls.js) tech

## Installation
### NPM
To install `videojs-contrib-hls.js` with npm run

```bash
npm install --save videojs-contrib-hls.js
```

### CDN
Select a version of HLS from the [CDN](...)

### Releases
Download a release of [videojs-contrib-hls](https://github.com/peer5/videojs-contrib-hls.js/release)

## Getting Started
Get a copy of [videojs-contrib-hls](#installation) and include it in your page along with video.js:

```html
<video id=player width=600 height=300 class="video-js vjs-default-skin" controls>
  <source
     src="https://example.com/index.m3u8"
     type="application/x-mpegURL">
</video>
<script src="video.js"></script>
<script src="videojs-contrib-hlsjs.min.js"></script>
<script>
var player = videojs('#player');
</script>
```