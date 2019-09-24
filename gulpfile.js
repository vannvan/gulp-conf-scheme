/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-09-24 16:14:05
* @Last Modified by:   vannvan
* @Last Modified time: 2019-09-24 17:42:49
*/
const gulp = require('gulp');
const uglify = require('gulp-uglify')  //压缩js文件
const minifyCSS = require('gulp-minify-css')  //压缩css
const clean = require('gulp-clean'); // 请理文件
var imagemin = require('gulp-imagemin')  //图片压缩
const { series, parallel } = require('gulp');

const root = 'src'

function resolve (dir) {
  return root + '/' + dir
}

const Path = {
	html:'html',
	css:'css',
	images:'images',
	js:'js'
}

async function cleanDist() {
	await gulp.src('./dist', {read: false, allowEmpty: true})
		.pipe(clean({force: true})
	);
}

async function js() {
  await gulp.src(resolve(Path.js)+ '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
}

async function copy() {
  	await gulp.src(resolve(Path.html) + '/*.html')
    .pipe(gulp.dest('dist/html'))
}

async function css() {
	await gulp.src(resolve(Path.css) + '/*.css')
		 .pipe(minifyCSS())
		 .pipe(gulp.dest('dist/css'))
}


async function images() {
	await gulp.src(resolve(Path.images) + '/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
}

//图片与其他任务一起执行会只有图片留下来，
exports.images = images
exports.build = series(cleanDist, parallel(js, copy , css));


//分别执行命令gulp build 和 gulp images