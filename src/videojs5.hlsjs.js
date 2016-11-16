(function(videojs, Hls) {

    // nothing to do if loaded without videojs/hlsjs
    if (!videojs || !Hls) {
        console.error('Missing videojs/Hls libraries');
        return;
    }

    /**
     *
     * @param source
     * @param tech
     * @constructor
     */
    function Html5HlsJS(source, tech) {
        var options = tech.options_;
        var el = tech.el();
        var duration = null;
        var hls = new Hls(options.hlsjsConfig);

        /**
         * creates an error handler function
         * @returns {Function}
         */
        function errorHandlerFactory() {
            var _recoverDecodingErrorDate = null;
            var _recoverAudioCodecErrorDate = null;

            return function() {
                var now = Date.now();

                if (!_recoverDecodingErrorDate || (now - _recoverDecodingErrorDate) > 2000) {
                    _recoverDecodingErrorDate = now;
                    hls.recoverMediaError();
                } else if (!_recoverAudioCodecErrorDate || (now - _recoverAudioCodecErrorDate) > 2000) {
                    _recoverAudioCodecErrorDate = now;
                    hls.swapAudioCodec();
                    hls.recoverMediaError();
                } else {
                    console.error('Error loading media: File could not be played');
                }
            }
        }

        // create separate error handlers for hlsjs and the video tag
        var hlsjsErrorHandler = errorHandlerFactory();
        var videoTagErrorHandler = errorHandlerFactory();

        // listen to error events coming from the video tag
        el.addEventListener('error', function(e) {
            var mediaError = e.currentTarget.error;

            if (mediaError.code === mediaError.MEDIA_ERR_DECODE) {
                videoTagErrorHandler();
            } else {
                console.error('Error loading media: File could not be played');
            }
        });

        /**
         *
         */
        this.dispose = function() {
            hls.destroy();
        };

        /**
         * returns the duration of the stream, or Infinity if live video
         * @returns {Infinity|number}
         */
        this.duration = function() {
            return duration || el.duration || 0;
        };

        // update live status on level load
        hls.on(Hls.Events.LEVEL_LOADED, function(event, data) {
            duration = data.details.live ? Infinity : data.details.totalduration;
        });

        // try to recover on fatal errors
        hls.on(Hls.Events.ERROR, function(event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hlsjsErrorHandler();
                        break;
                    default:
                        console.error('Error loading media: File could not be played');
                        break;
                }
            }
        });

        Object.keys(Hls.Events).forEach(function(key) {
            var eventName = Hls.Events[key];
            hls.on(eventName, function(event, data) {
                tech.trigger(eventName, data);
            });
        });

        // attach hlsjs to videotag
        hls.attachMedia(el);
        hls.loadSource(source.src);
    }

    var HlsSourceHandler = {
        canHandleSource: function(source) {
            var hlsTypeRE = /^application\/x-mpegURL$/i;
            var hlsExtRE = /\.m3u8/i;

            if (source.skipContribHlsJs) {
                return '';
            } else if (hlsTypeRE.test(source.type)) {
                return 'probably';
            } else if (hlsExtRE.test(source.src)) {
                return 'maybe';
            } else {
                return '';
            }
        },
        handleSource: function(source, tech) {
            return new Html5HlsJS(source, tech);
        },
        canPlayType: function(type) {
            var hlsTypeRE = /^application\/x-mpegURL$/i;
            if (hlsTypeRE.test(type)) {
                return 'probably';
            }

            return '';
        }
    };

    // only attach this source handler is its supported
    if (Hls.isSupported()) {
        videojs.getComponent('Html5').registerSourceHandler(HlsSourceHandler, 0);
    }
})(window.videojs, window.Hls);
