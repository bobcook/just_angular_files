import gulp from 'gulp';

const spawn = require('child_process').spawn;

gulp.task('deploy', ['build'], function (done) {
  const ps = spawn('divshot', ['push']);

  ps.stdout.pipe(process.stdout);
  ps.stderr.pipe(process.stderr);

  ps.on('exit', done);
});
