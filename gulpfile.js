var gulp = require('gulp')
// 引入组件
var pug        = require('gulp-pug')
var less       = require('gulp-less')
var cssauto    = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var concat     = require('gulp-concat')
var cleanCSS   = require('gulp-clean-css')
var uglify     = require('gulp-uglify')
var rename     = require('gulp-rename')
var imagemin   = require('gulp-imagemin')
var pngcrush   = require('imagemin-pngcrush')
var cache      = require('gulp-cache')
var changed    = require('gulp-changed')
var plumber    = require("gulp-plumber")
var notify     = require("gulp-notify")
var del        = require('del')
var path       = require('path')

var codeDir = 'client/code'
var destDir = 'client/dest'
gulp.task('pug', function(){
	// clean
	del.sync(destDir + '/pug')
	del.sync(destDir + '/*.html')
	// 生成pug
	gulp.src(codeDir + '/pug/**')
		.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
		.pipe(gulp.dest(destDir + '/pug'))
	// 生成html
	gulp.src(codeDir + '/pug/*.pug')
		.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
		.pipe(pug({
			// pretty: true
		}))
		.pipe(gulp.dest(destDir + '/'))
})
// 编译Lass
gulp.task('less', function(){
	// clean
	del.sync(destDir + '/css')
	// 生成css
	gulp.src(codeDir + '/less/*.less')
		.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
		.pipe(changed(destDir + '/css'))
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(cssauto())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(destDir + '/css'))
})
// 合并文件
gulp.task('concat', function(){
	// clean
	del.sync(destDir + '/js')
	// 生成js
	gulp.src(codeDir + '/js/*.js')
		.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
		.pipe(changed(destDir + '/js'))
		.pipe(concat('common.js'))
		.pipe(uglify())
		.pipe(gulp.dest(destDir + '/js'))
		// .pipe(rename('common.min.js'))
		// .pipe(gulp.dest('./dest/js'))
	// 生成js插件
	gulp.src(codeDir + '/js/libs/*.js')
		.pipe(gulp.dest(destDir + '/js/libs'))
})
// 压缩图片
gulp.task('image', function(){
    // 生成img
	gulp.src(codeDir + '/image/**')
		.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
		.pipe(changed(destDir + '/image'))
	    .pipe(cache(imagemin({
	        progressive: true,
	        svgoPlugins: [{removeViewBox: false}],
	        use: [pngcrush()]
	    })))
	    .pipe(gulp.dest(destDir + '/image'))
})
// 清除dest
gulp.task('clean', function(){
	del.sync(destDir)
})
// 默认任务
gulp.task('default', ['clean'], function(){
	gulp.run('pug', 'less', 'concat', 'image')
	// 监听文件变化
	gulp.watch(codeDir + '/pug/**',   ['pug'])
	gulp.watch(codeDir + '/less/**',  ['less'])
	gulp.watch(codeDir + '/js/**',    ['concat'])
	gulp.watch(codeDir + '/image/**', ['image']).on('change', function(event){
		if(event.type == 'deleted'){
			var url = destDir + '/' + path.relative(codeDir, event.path)
			del.sync(url)
		}
	})
})