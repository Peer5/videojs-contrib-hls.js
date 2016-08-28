var gulp = require('gulp');
var concat = require('gulp-concat');

var sources = [
    'node_modules/videojs-contrib-media-sources/dist/videojs-contrib-media-sources.min.js',
    'node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js',
    'node_modules/hls.js/dist/hls.min.js',
    'src/**/*.js'
];

gulp.task('build', function() {
    return gulp.src(sources)
        .pipe(concat('videojs-contrib-hlsjs.js'))
        .pipe(gulp.dest('dist/'));
});