const gulp = require('gulp');
const series = gulp.series;

let serverRunning = false;

gulp.task('sass', () => {
    const sass = require('gulp-sass');

    return gulp
        .src(['./tests/*.scss', '!./test/_*.scss'])
        .pipe(sass()
            .on('error', sass.logError)
            // .on('warn', sass.logError)
        )
        .pipe(gulp.dest('./tests'))
});

gulp.task('test', series('sass'));

gulp.task('docs', (done) => {
    const sassdoc = require('sassdoc');
    const sdConfig = require('./.sassdoc.js');

    gulp
        .src('./lib/**/*.scss')
        .pipe(sassdoc(sdConfig)
            .on('end', done)
            .on('error', done))
        .on('error', done);
});

gulp.task('serve', (done) => {
    serverRunning = true;
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
    gulp.watch(
        ['./**/*.scss', '!./node_modules/', '!./docs/**/*'],
        { ignoreInitial: false },
        series('docs', 'sass')
    );

    if (!serverRunning) console.info('If you want to run a server as well, use \n "gulp serve watch".');
});

gulp.task('default', series('docs', 'sass'));
