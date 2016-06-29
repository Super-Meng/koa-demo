import Router from 'koa-router'

export default (app) => {

	const router = new Router()

	router
		.get('/', async (ctx) => {
			await ctx.render('index')
		})

	router
		.get('*', async (ctx) => {
			await ctx.render('index')
		})

	app.use(router.routes())
	app.use(router.allowedMethods())
}