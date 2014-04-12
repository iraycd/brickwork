var gulp = require('gulp'),
  rigger = require('gulp-rigger'),
  uglify = require('gulp-uglifyjs'),
  header = require('gulp-header'),
  pkg = require('./package.json');

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%= pkg.author %>',
  ' */',
  ''].join('\n');

gulp.task('rig', function () {
    gulp.src('src/brickwork.js')
        .pipe(rigger())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./'));
});

gulp.task('uglify',['rig'] , function() {
  gulp.src('brickwork.js')
    .pipe(uglify('brickwork.min.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./'))
});