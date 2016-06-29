import common from 'layout-js'

import Vue from 'vue'
import store from 'store'
import Banner from 'components/Banner.vue'
 
new Vue({
	el: 'body',
	store,
	components: {
		'goods-banner': Banner,
	}
})