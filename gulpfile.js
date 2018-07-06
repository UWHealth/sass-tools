const gulp = require('gulp');
const sass = require('gulp-sass');
const sassdoc = require('sassdoc');
const series = gulp.series;

gulp.task('sass', (done) => {
    return gulp
        .src(['./tests/*.scss'])
        .pipe(sass({
            sourceComments: false
        }))
        .pipe(gulp.dest('./tests'))
        .on('error', done)
        .on('end', done);
});

gulp.task('docs', (done) => {
    const sdConfig = require('./.sassdoc.js');
    return gulp
        .src('./**/*.scss')
        .pipe(sassdoc(sdConfig))
        .on('end', done)
        .on('error', done)
});

gulp.task('watch', () => {
    const browserSync = require('browser-sync').create();

    browserSync.init({
        files: ['./test/**/*.css', './test/**/*.html', './docs/**/*'],
        watch: true,
        open: false,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./**/*.scss'], series('sass', 'docs'));
});

gulp.task('default', series('sass', 'docs'));
