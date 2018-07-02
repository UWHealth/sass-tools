const gulp = require('gulp');
const sass = require('gulp-sass');
const series = gulp.series;

gulp.task('sass', (done) => {
    return gulp
        .src('./tests/*.scss')
        .pipe(sass({
            sourceComments: false
        }))
        .pipe(gulp.dest('./tests'))
        .on('error', done)
        .on('end', done);
});

gulp.task('watch', () => {
    const browserSync = require('browser-sync').create();

    browserSync.init({
        files: ['./test/**/*.css', './test/**/*.html'],
        watch: true,
        open: false,
        server: {
            baseDir: "./tests"
        }
    });

    gulp.watch(['./**/*.scss'], series('sass'));
});

gulp.task('default', series('sass'));
