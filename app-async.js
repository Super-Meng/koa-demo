// koa@2 server
const koa  = require('koa')
const app  = new koa()
const port = process.env.PORT || 3000
// connect to mongoDB
// const mongoose = require('mongoose')
// const DBURL = 'mongodb://localhost/app'
// mongoose.connect(DBURL)
// middlewares
const convert    = require('koa-convert')
const json       = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger     = require('koa-logger')
const Pug        = require('koa-pug')
const pug        = new Pug({
	viewPath: './client/dest/pug'
})
pug.use(app)
app.use(convert(bodyparser()))
app.use(convert(json()))
app.use(convert(logger()))
app.use(require('koa-static')('./client/dest'))
// app.use('/image', require('koa-static')('./client/code/image'))
// app.use('/css', require('koa-static')('./client/code/css'))
app.use(async (ctx, next) => {
	try{
		await next()
	}catch(err){
		ctx.body   = {message: err.message}
		ctx.status = err.status || 500
	}
})	
// 端口
app.listen(port)
// 路由
require('./app-router')(app)

console.log('koa@2 is start in '+ port)