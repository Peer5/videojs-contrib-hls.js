# HLS plugin for video.js using hls.js
Plays HLS with [video.js](https://github.com/videojs/video.js) on any platform, even where it's not natively supported, using [Dailymotion's hls.js](https://github.com/dailymotion/hls.js) tech.

This bundled plugin is an **alternative** to the original [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls) and runs directly on top of [video.js 5.0+](https://github.com/videojs/video.js).

Like the original implementation, this plugin implements a source handler for m3u8 files.
`hls.js` is bundled inside and there is no need to include it in addition.

## Installation
### NPM
To install `videojs-contrib-hls.js` with npm run

```bash
npm install --save videojs-contrib-hls.js
```

### CDN
Get the latest stable version from the [CDN](https://unpkg.com/videojs-contrib-hls.js)

### Releases
Download a release of [videojs-contrib-hls](https://github.com/peer5/videojs-contrib-hls.js/releases)

## Getting Started
Get a copy of [videojs-contrib-hls](#installation) and include it in your page along with video.js:

```html
<video id=player width=600 height=300 class="video-js vjs-default-skin" controls>
  <source src="https://example.com/index.m3u8" type="application/x-mpegURL">
</video>
<script src="video.js"></script>
<script src="videojs-contrib-hlsjs.min.js"></script>
<script>
  var player = videojs('#player');
</script>
```

in a CommonJS app

```js
var videojs = require('video.js');
require('videojs-contrib-media-sources'); // increase browser support with MSE polyfill
require('videojs-contrib-hls.js'); // auto attaches hlsjs handler

var player = videojs('#player');

```

## Options
hls.js is [very configurable](https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning), you may pass in an options object to the source handler at player initialization. You can pass in options just like you would for other parts of video.js:

``` html
<video id=player width=600 height=300 class="video-js vjs-default-skin" controls>
  <source src="https://example.com/index.m3u8" type="application/x-mpegURL">
</video>
<script src="video.js"></script>
<script src="videojs-contrib-hlsjs.min.js"></script>
<script>
    var player = videojs('video', {
        autoplay: true,
        html5: {
            hlsjsConfig: {
                debug: true
            }
        }
    });
</script>
```

## Advanced Usage

### Listening to hls.js events

 events are passed to the tech and can be subscribed to

 ```js
    var player = videojs('video');
    player.tech_.on(Hls.Events.MANIFEST_LOADED, function (e) {
        // do something
    })
 ```

full list of hls.js events can be found [here](https://github.com/video-dev/hls.js/blob/master/doc/API.md#runtime-events)

*NOTE* hls.js global is exposed to `window.Hls` when the module is loaded

### Custom hls.js configuration

**DO NOT USE THIS REF UNLESS YOU KNOW WHAT YOU ARE DOING**

the hls.js instance is exposed on the sourceHandler instance

 ```js
    var player = videojs('video');
    // player.tech_.sourceHandler_.hls is the underlying Hls instance
    player.tech_.sourceHandler_.hls.currentLevel = -1
 ```
