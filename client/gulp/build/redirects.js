import gulp from 'gulp';
import path from 'path';
import csv2json from 'gulp-csv2json';
import rename from 'gulp-rename';
import conf from '../conf';
import fs from 'fs';
import _ from 'lodash';

gulp.task('redirects:readCSV', function () {
  return gulp.src(path.join(conf.paths.root, '/client/redirects.csv'))
    .pipe(csv2json())
    .pipe(rename({extname: '.json'}))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});

gulp.task('redirects:import', ['redirects:readCSV'], function () {
  const json =
    JSON.parse(fs.readFileSync(path.join(conf.paths.tmp, '/redirects.json')));
  let formatted = {};
  _.forEach(json, function (e) {
    formatted[e.old_url] = e.new_url;
  });
  fs.writeFileSync(
    path.join(conf.paths.dist, '/redirects.json'),
    JSON.stringify(formatted)
  );
});
