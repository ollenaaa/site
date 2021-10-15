var gulp = require ("gulp");
var sass = require ('gulp-sass')(require('sass')),
cssnano = require ("gulp-cssnano"),
autoprefixer = require ('gulp-autoprefixer'),
imagemin = require ('gulp-image'),
concat = require ("gulp-concat"),
uglify = require ("gulp-uglify"),
rename = require ("gulp-rename");

gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe (gulp.dest("dist"));
});

gulp.task('sass', function() {
    return gulp.src("app/sass/*.sass")
        .pipe(concat( 'styles.sass'))
        .pipe(sass())
        .pipe (autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe (cssnano())
        .pipe (rename ({suffix: '.min'}))
        .pipe (gulp.dest ( "dist/css"));
});

gulp.task('scripts', function() {
    return gulp.src("app/js/*.js")
        .pipe(concat( 'scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/js"));
});

gulp.task('img', function() {
    return gulp.src("app/img/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/img"))
    });

gulp.task('watch', function() {
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('scripts'));
    gulp.watch('app/sass/*.sass', gulp.parallel('sass'));
    gulp.watch('app/img/*.+(jpg|jpeg|png|gif)', gulp.parallel('img'));
});

gulp.task('default', gulp.series('html', 'sass', 'scripts', 'img', 'watch'));
