const gulp = require('gulp');
const sass = require('gulp-sass');
const purify = require('gulp-purifycss');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnext = require('postcss-cssnext');
const cleanCSS = require('gulp-clean-css');
const ftp = require('vinyl-ftp');

gulp.task('deploy', ()=>{
    let conn = ftp.create({
        host:'calebprenger.com',
        user:'calebprenger',
        password:'s!dJ#4p}_tL3',
        parallel:10
    });
    let globs = [
        './dist/*'
    ];
    return gulp.src(globs, {base:'.',buffer:false})
    .pipe(conn.dest('/public_html/gulpftp'))
});

gulp.task('scss', ()=>{
    let config = [
        cssnext({browsers:['last 55 versions']})
    ];
    return gulp.src('app/scss/stylesheet.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(config))
    .pipe(cleanCSS({compatibility:'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    
});
gulp.task('watch',function(){
   gulp.watch('app/scss/stylesheet.scss',gulp.series('scss','deploy'));

});
