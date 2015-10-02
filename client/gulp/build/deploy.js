var gulp = require('gulp');
var spawn = require('child_process').spawn;

gulp.task('deploy', ['build'], function (done) {
  var ps = spawn('divshot', ['push']);

  ps.stdout.pipe(process.stdout);
  ps.stderr.pipe(process.stderr);

  ps.on('exit', done);
});
