/*
 * @Author: jypblue
 * @Date:   2016-08-03 10:53:58
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-03 11:14:52
 */

'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const gulputil = require('gulp-util');
const colors = require('colors');

const webpackconf = require('./webpack.config.js');

const src = process.cwd() + '/src';
const dist = process.cwd() + 'dist';

//eslint check
gulp.task('lint', () => {
  let eslint = require('gulp-eslint');
  return gulp.src([
      '!' + src + '/js/lib/**/*.js',
      src + '/js/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//clean dist
gulp.task('clean', ['lint'], () => {
  let clean = require('gulp-clean');
  return gulp.src(dist, {
    read: true
  }).pipe(clean());
});

//run webpack
gulp.task('pack', ['clean'], (done) => {
  webpack(webpackconf, (err, stats) => {
    if (err) {
      throw new gulputil.PluginError('webpack', err);
    }
    gulputil.log('[webpack]', stats.toString({
      colors: true
    }));
    done();
  })
})


gulp.task('default', ['pack']);
