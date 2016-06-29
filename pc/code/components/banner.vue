<style lang="less" scoped>
	@import (less) '../less/config.less';
	@banner_h: 9.37rem;
	@mb: 0.24rem;
	.banner{
		position: relative;
		width: @ww;
		overflow: hidden;
		.image_box{
			position: relative;
			left: 0;
			width: 100%;
			overflow: hidden;
			ul{
				position: relative;
				left: 0;
				li{
					float: left;
					width: @ww;
				}
			}
			img{
				display: block;
				width: 100%;
			}
		}
		.dot_box{
			position: absolute;
			text-align: center;
			bottom: 0.20rem;
			width: 100%;
			line-height: 0;
			a{
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background: #FFF;
				border-radius: 50%;
				margin: 0 0.06rem;
				&.active{
					background: @c_blue;
				}
			}
		}
	}
</style>

<template lang="pug">
	.banner
		.image_box
			ul(v-bind:style=`{
				width: goods.banner.photo.length * 100 + '%',
				transition: 'all '+ goods.banner.animate_speed +'ms ease-out',
				transform: 'translateX('+ (-7.50*goods.banner.active + goods.banner.move/100) + 'rem)',
			}`)
				li(v-for='_photo in goods.banner.photo')
					a(v-bind:href='_photo.href')
						img(v-bind:src='_photo.src' v-touch:pan.prevent='panBanner')
		.dot_box
			a(v-for='_dot in goods.banner.photo'
				href='javascript:'
				class='{{$index == goods.banner.active ? "active": ""}}')
		.clear
</template>

<script>
	import { getGoodsDetails } from 'getters'
	import { panBanner } from 'actions'

	export default{
		vuex: {
			getters: {
				goods: getGoodsDetails,
			},
			actions: {
				panBanner,
			},	
		}
	}
</script>