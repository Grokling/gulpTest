var gulp = require('gulp');
var debug = require('gulp-debug');
var a, b

gulp.task('noVar', function () {
    return gulp.src('foo.js')
        .pipe(gulp.dest('dist'))
        .pipe(debug({title: 'unicorn:'}));
});


gulp.task('withVar', function() {
  a = gulp.src('foo.js')
      .pipe(gulp.dest('dist'));
  return a.pipe(debug({title: 'unicorn:'}));
})


gulp.task('setVar', function() {
  b = gulp.src('foo.js')
      .pipe(gulp.dest('dist'));
  return b;
})

gulp.task('asyncVar', ['setVar'], function(){
  //setVar is an async task - we should not be executing this until setVar has completed
  //which should mean that 'b' has a similar value to 'a' on line 15.
  //But, the debug shows otherwise.
  return b.pipe(debug({title: 'unicorn:'}));
})
