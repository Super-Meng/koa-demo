import { GET_GOODS_DETAILS } from '../../api/goods'

const state = {
	goods: GET_GOODS_DETAILS,
}

const mutations = {
	CHANGE_BANNER (state, active, move, speed){
		state.goods.banner.animate_speed = speed
		state.goods.banner.active = active
		state.goods.banner.move = move
	}
}

export default {
    state,
    mutations
}