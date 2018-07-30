const gulp = require('gulp');
const sass = require('gulp-sass');
const sassdoc = require('sassdoc');
const series = gulp.series;

gulp.task('sass', () => {
    return gulp
        .src(['./tests/*.scss', '!./test/_*.scss'])
        .pipe(sass.sync()
            .on('error', sass.logError)
        )
        .pipe(gulp.dest('./tests'))

});

gulp.task('docs', (done) => {
    const sdConfig = require('./.sassdoc.js');
    gulp
        .src('./**/*.scss')
        .pipe(sassdoc(sdConfig)
            .on('end', done)
            .on('error', done))
        .on('error', done);
});

gulp.task('serve', (done) => {
    const browserSync = require('browser-sync').create();

    browserSync.init({
        files: ['./tests/**/*.css', './tests/**/*.html', './docs/**/*', '!*.js'],
        watch: true,
        open: false,
        server: {
            baseDir: "./"
        }
    });

    done();
});

gulp.task('watch', function watch(done) {
    gulp.watch(['./**/*.scss', '!./node_modules/', '!./docs/**/*'], { ignoreInitial: false }, series('docs', 'sass'));
    console.log('If you want to run a server as well, use "gulp watch serve".');
});

gulp.task('default', series('docs', 'sass'));
