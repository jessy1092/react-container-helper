
import gulp       from 'gulp';
import gbabel     from 'gulp-babel';

const TRANSPILE_PATH = './lib';
const SOURCE_PATH = './src';

gulp.task('transpile', () => (
  gulp.src(`${SOURCE_PATH}/**/*`)
    .pipe(gbabel({ presets: ['es2015', 'react', 'stage-3'] }))
    .pipe(gulp.dest(TRANSPILE_PATH))
));

gulp.task('watch', () => {
  gulp.watch(`${SOURCE_PATH}/**/*`, ['build']);
});

gulp.task('build', ['transpile']);
gulp.task('dev', ['build', 'watch']);
gulp.task('default', ['build']);
