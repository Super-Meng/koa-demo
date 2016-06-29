import gulp        from'gulp'
import pug         from 'gulp-pug'
import less        from 'gulp-less'
import cssauto     from 'gulp-autoprefixer'
import sourcemaps  from 'gulp-sourcemaps'
import webpack     from 'webpack'
import gulpWebpack from 'gulp-webpack'
import named       from 'vinyl-named'
import cleanCSS    from 'gulp-clean-css'
import uglify      from 'gulp-uglify'
import imagemin    from 'gulp-imagemin'
import pngcrush    from 'imagemin-pngcrush'
import cache       from 'gulp-cache'
import changed     from 'gulp-changed'
import plumber     from 'gulp-plumber'
import notify      from 'gulp-notify'
import del         from 'del'
import path        from 'path'

module.exports = (client) => {
	const codeDir = client.path + '/code'
	const destDir = client.path + '/dest'
	// 编译pug
	gulp.task('pug', function(){
		// 生成html
		gulp.src(codeDir + '/pug/*.pug')
			.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
			.pipe(changed(destDir + '*.html'))
			.pipe(pug({
				pretty: true
			}))
			.pipe(gulp.dest(destDir + '/'))
		// 移动pug
		gulp.src(codeDir + '/pug/**')
			.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
			.pipe(changed(destDir + '/pug'))
			.pipe(gulp.dest(destDir + '/pug'))
	})
	// 编译Lass
	gulp.task('less', function(){
		// 生成css
		gulp.src(codeDir + '/less/*.less')
			.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
			.pipe(changed(destDir + '/css'))
			// .pipe(sourcemaps.init())
			.pipe(less())
			.pipe(cssauto())
			.pipe(cleanCSS())
			// .pipe(sourcemaps.write())
			.pipe(gulp.dest(destDir + '/css'))
		
		gulp.src(codeDir + '/less/*.css')
			.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
			.pipe(gulp.dest(destDir + '/css'))
	})
	// 编译js
	gulp.task('js', function(){
		// vue
		gulp.src(codeDir + '/js/*.js')
			.pipe(plumber({errorHandler: notify.onError("error: <%= error.message %>")}))
			.pipe(changed(destDir + '/js'))
			.pipe(named())
			.pipe(gulpWebpack({
				watch: true,
				babel: {
					presets: ['es2015', 'stage-3'],
				},
				module: {
					loaders: [
						{ test: /\.(es6|js)$/, loader: 'babel'},
						{ test: /\.vue$/, loader: 'vue'},
						{ test: /\.less$/,loader: 'style!css!less'},
						{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
					],
				},
				devtool: 'source-map',
				output: {
					filename: '[name].build.js',
				},
				resolve: {
					// 省略的扩展名
					extensions: ['', '.js', '.vue', '.es6', '.less'],
					alias: {
						'layout-css': path.join(__dirname, codeDir + '/less/config.less'),
						'layout-js':  path.join(__dirname, codeDir + '/js/layout.es6'),
						'store':      path.join(__dirname, codeDir + '/vuex/store.js'),
						'getters':    path.join(__dirname, codeDir + '/vuex/getters.js'),
						'actions':    path.join(__dirname, codeDir + '/vuex/actions.js'),
						'mutations':  path.join(__dirname, codeDir + '/vuex/mutations.js'),
						'components': path.join(__dirname, codeDir + '/components'),
						'modules':    path.join(__dirname, codeDir + '/vuex/modules'),
					}
				},
				// devServer: {
				// 	historyApiFallback: true,
				// 	hot: false,
				// 	inline: true,
				// 	grogress: true,
				// },
				// plugins: [
				// 	new webpack.DefinePlugin({
				// 		'process.env': {
				// 			NODE_ENV: '"production"'
				// 		}
				// 	}),
				// 	new webpack.optimize.UglifyJsPlugin({
				// 		compress: {
				// 			warnings: false
				// 		}
				// 	})
				// ],
			}))
			.pipe(gulp.dest(destDir + '/js'))
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
		gulp.run('pug', 'less', 'js', 'image')
		// 监听文件变化
		gulp.watch(codeDir + '/pug/**',         ['pug'])
		gulp.watch(codeDir + '/less/**',        ['less'])
		// gulp.watch(codeDir + '/js/**',          ['js'])
		// gulp.watch(codeDir + '/api/**',         ['js'])
		// gulp.watch(codeDir + '/vuex/**',        ['js'])
		// gulp.watch(codeDir + '/components/**',  ['js'])
		gulp.watch(codeDir + '/image/**', ['image']).on('change', function(event){
			if(event.type == 'deleted'){
				var url = destDir + '/' + path.relative(codeDir, event.path)
				console.log('DELETE => ' + url)
				del.sync(url)
			}
		})
	})
}