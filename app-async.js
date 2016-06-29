// koa@2 server
import koa        from 'koa'
// import mongoose   from 'mongoose'
import convert    from 'koa-convert'
import json       from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger     from 'koa-logger'
import Pug        from 'koa-pug'
import serve      from 'Koa-static2'
import approuter  from './app-router'

module.exports = (client) => {

	const app        = new koa()
	const clientPath = client.path
	const port       = process.env.PORT || client.port
	const DBURL      = client.db
	const pug        = new Pug({
		viewPath: clientPath + '/dest/pug',
		noCache:  !client.env,
	})
	// 预编译
	pug.use(app)
	// 中间件
	app.use(convert(bodyparser()))
	app.use(convert(json()))
	app.use(convert(logger()))
	app.use(async (ctx, next) => {
		try{
			await next()
		}catch(err){
			ctx.body   = {message: err.message}
			ctx.status = err.status || 500
		}
	})
	// 数据库
	// mongoose.connect(clientPath.db)
	// 端口
	app.listen(port)
	// 路由
	app.use(serve('image', clientPath + '/dest/image'))
	app.use(serve('css',   clientPath + '/dest/css'))
	app.use(serve('js',    clientPath + '/dest/js'))
	approuter(app)
	// 服务器运行完成
	console.log('koa@2 is start in '+ port)
}