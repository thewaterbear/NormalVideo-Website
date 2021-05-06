const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const posthtml = require('gulp-posthtml');

function includePartials() {
  console.log("running include partials");
  return gulp.src('src/*.html')
    .pipe(posthtml())
    .pipe(gulp.dest('./'))
};

//run includeParticles whenever html files in src are changed
function watchFiles() {
  includePartials();
  gulp.watch("src/**/*.html", includePartials);
}

function buildFiles() {

}

function html() {
  console.log("running html");
  return gulp.src('src/*.html')
    .pipe(posthtml())
    .pipe(gulp.dest('./'))
}

const watch = gulp.parallel(watchFiles);
exports.watch = watch;
exports.html = html;
