var gulp = require('gulp'),
    stylus = require('gulp-stylus'), 
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    nib = require('nib');
 
// Jade
gulp.task('jade', function(){
  gulp.src('src/*.jade') // Исходный файл
    .pipe(jade({pretty: true})) // Выводим красивый код
    .on('error', console.log) // Выводим ошибки в консоль
    .pipe(gulp.dest('build/')); // Файл на выходе
});

// Stylus
gulp.task('stylus', function () {
  gulp.src('src/styl/*.styl') // Исходный файл
    .pipe(sourcemaps.init({loadMaps: true})) // запускаем sourcemaps
    .pipe(stylus({
      use: nib(), 
      compress: false
    })) // Используем nib и сжимаем файл
    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions'],
    //   cascade: false
    // })) // Используем autoprefixer
    .pipe(sourcemaps.write()) // записываем soucemaps
    .on('error', console.log) // Выводим ошибки в консоль
    .pipe(gulp.dest('build/css/')); // Файл на выходе
});


// Watch
gulp.task('watch', function(){
  gulp.watch('src/*.jade',['jade']);
  gulp.watch('src/styl/*.styl',['stylus']);
});