'use strict';

const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const nsp = require('gulp-nsp');
const plumber = require('gulp-plumber');
const coveralls = require('gulp-coveralls');
const babel = require('gulp-babel');
const del = require('del');
const isparta = require('isparta');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-register')(require('./.babelrc'));

gulp.task('static', () => gulp.src('**/*.js')
  .pipe(excludeGitignore())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('nsp', cb => {
  nsp({
    package: path.resolve('package.json')
  }, cb);
});

gulp.task('pre-test', () => gulp.src(['lib/**/*.js', '!lib/**/*.test.js'])
  .pipe(excludeGitignore())
  .pipe(istanbul({
    includeUntested: true,
    instrumenter: isparta.Instrumenter
  }))
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], cb => {
  let mochaErr;

  gulp.src(['lib/**/*.test.js', 'test/**/*.js'])
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', err => {
      console.log(err);
      mochaErr = err;
      process.exit(1);
    })
    .pipe(istanbul.writeReports())
    .on('end', () => {
      cb(mochaErr);
    });
});

gulp.task('watch', ['test'], () => {
  gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('babel', ['clean'], () => gulp.src('lib/**/*.js')
  .pipe(babel(require('./.babelrc')))
  .pipe(gulp.dest('dist')));

gulp.task('clean', () => del('dist'));

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test', 'coveralls']);
