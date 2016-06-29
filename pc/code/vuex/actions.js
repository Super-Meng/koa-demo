export const panBanner = ({dispatch, state}, e) => {
	let move   = e.deltaX
	let active = state.goods_details.goods.banner.active
	let speed  = state.goods_details.goods.banner.animate_speed
	const len  = state.goods_details.goods.banner.photo.length
	
	e.preventDefault()

	if (e.srcEvent.type == 'touchend' || e.srcEvent.type == 'mouseup'){
		if (move < -20 && active < len - 1){
			active ++
		}else if(move > 20 && active > 0){
			active --
		}
		move = 0
		speed = 300
	}else{
		speed = 0
	}
	return dispatch('CHANGE_BANNER', active, move, speed)
}