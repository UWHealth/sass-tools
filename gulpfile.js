const gulp = require('gulp');
const series = gulp.series;

require('patch-package');

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
    const fs = require('fs');
    const path = require('path');

    gulp
        .src('./lib/**/*.scss')
        .pipe(sassdoc(sdConfig))
            /* Add this back in if you want to see the JSON of the docs */
            // .on('data', (data) => {
            //
            //     fs.writeFileSync(
            //         path.resolve(__dirname, './tests/docsData.json'),
            //         JSON.stringify(data),
            //         (err) => console.log(err)
            //     )
            // })
            .on('end', done)
            .on('error', done)
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

gulp.task('watch', series(gulp.parallel('docs', 'sass'), function watch(done) {
    gulp.watch(
        ['./+(lib|tests)/**/*.scss'],
        { ignoreInitial: true },
        series('sass')
    );

    gulp.watch(
        ['./lib/**/*.scss'],
        { ignoreInitial: true },
        series('docs')
    );

    if (!serverRunning) console.info('If you want to run a server as well, use \n "gulp serve watch".');
}));

gulp.task('default', gulp.parallel('docs', 'sass'));
