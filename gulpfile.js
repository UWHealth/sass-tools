const gulp = require('gulp');
const sass = require('gulp-sass');
const sassdoc = require('sassdoc');
const browserSync = require('browser-sync').create();
const series = gulp.series;
//const plumber = require('gulp-plumber');

gulp.task('sass', function() {
    return gulp
        .src('./tests/test.scss')
        //.pipe(plumber())
        .pipe(sass.sync()
            .on('error', (err) => {
                console.log(err);
            })
        )
        //.pipe(plumber.stop())
        .pipe(gulp.dest('./tests'))

});

gulp.task('docs', (done) => {
    const sdConfig = require('./.sassdoc.js');
    gulp
        .src('./**/*.scss')
        .pipe(sassdoc(sdConfig)
            .on('end', done))
        .on('error', done);
});

gulp.task('serve', (done) => {
    browserSync.init({
        files: ['./test/**/*.css', './test/**/*.html', './docs/**/*'],
        watch: true,
        open: false,
        server: {
            baseDir: "./"
        }
    });

    done();
});

gulp.task('watch', gulp.parallel('serve', function watch(done) {
    gulp.watch(['./**/*.scss', '!./node_modules/'], { ignoreInitial: false }, series('docs', 'sass'));
}));

gulp.task('default', series('docs', 'sass'));
