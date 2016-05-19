var this_page = function(who){
	if($('.nav a').length == 0){
		return
	}

	$('.nav a').eq(who).addClass('active')
}
var tab_toggle = function(tab, page){
	if($('a', tab).length == 0 && $(page).length == 0){
		return
	}

	$(page).eq(0).show()

	$('a', tab).on('click', function(){
		var _len = $(this).index()
		var _w = $(this).width()

		$(this).parent().find('.line').css({'left': _w*_len})
		$(page).not(_len).hide().eq(_len).show()
	})
}
var set_banner = function(_banner, bannerObj){
	if($(_banner).length == 0){
		return
	}

	var _active = -1
	var autoPlay
	var autoPlay_speed = bannerObj.config.autoPlay_speed

	init()
	set_banner()

	function init(){
		$(_banner).prepend('<ul></ul><div class="dot"></div>')
		$.each(bannerObj.banner, function(){
			var banner_html = '<li>'
				+'<a href="'+ this.href +'">'
				+'<img src="'+ this.img +'">'
				+'</a></li>'
			var dot_html = '<a href="javascript:"></a>'
			$('ul', _banner).append(banner_html)
			$('.dot', _banner).append(dot_html)
		})
		show_page(0)
	}
	function set_banner(){
		$(_banner).hover(function(){
			clearInterval(autoPlay)
		},function(){
			autoPlay = setInterval(set_autoPlay, autoPlay_speed)
		}).trigger('mouseout')

		$('.dot', _banner).on('mouseover', 'a', function(){
			var _len = $(this).index()
			show_page(_len)
		})
	}
	function set_autoPlay(){
		var _page = _active + 1
		if(_page >= bannerObj.banner.length){
			_page = 0
		}
		show_page(_page)
	}
	function show_page(_len){
		if(_active == _len){
			return
		}else{
			_active = _len
		}
		
		$('li',_banner).removeClass('show').eq(_active).addClass('show')
		$('.dot a', _banner).removeClass('is_this').eq(_active).addClass('is_this')
	}
}