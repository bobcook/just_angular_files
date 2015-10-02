import gulp from 'gulp';
import conf from '../conf';

if (conf.isDevelopment) {
  require('gulp-graph')(gulp);
}
