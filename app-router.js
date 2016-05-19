const Router = require('koa-router')
const router = new Router()

module.exports = (app) => {
	router
		.get('/', async (ctx) => {
			await ctx.render('index')
		})

	app.use(router.routes())
	app.use(router.allowedMethods())
}