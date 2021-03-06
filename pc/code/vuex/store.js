import Vue from 'vue'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
import createLogger from 'vuex/logger'
import goods_details from 'modules/goods_details'

const debug = true
// process.env.NODE_ENV !== 'production'

Vue.config.debug = debug
Vue.config.devtools = debug

Vue.use(Vuex)
Vue.use(VueTouch)

export default new Vuex.Store({
    modules: {
        goods_details
    },
	strict: debug,
	moddlewares: debug ? [createLogger()] : []
})

if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept(['actions', 'mutations'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    const newActions = require('actions').default
    const newMutations = require('mutations').default
    // 加载新模块 
    store.hotUpdate({
      actions: newActions,
      mutations: newMutations
    })
  })
}