var this_page=function(n){0!=$(".nav a").length&&$(".nav a").eq(n).addClass("active")},tab_toggle=function(n,e){0==$("a",n).length&&0==$(e).length||($(e).eq(0).show(),$("a",n).on("click",function(){var n=$(this).index(),t=$(this).width();$(this).parent().find(".line").css({left:t*n}),$(e).not(n).hide().eq(n).show()}))},set_banner=function(n,e){function t(){$(n).prepend('<ul></ul><div class="dot"></div>'),$.each(e.banner,function(){var e='<li><a href="'+this.href+'"><img src="'+this.img+'"></a></li>',t='<a href="javascript:"></a>';$("ul",n).append(e),$(".dot",n).append(t)}),s(0)}function a(){$(n).hover(function(){clearInterval(o)},function(){o=setInterval(i,l)}).trigger("mouseout"),$(".dot",n).on("mouseover","a",function(){var n=$(this).index();s(n)})}function i(){var n=h+1;n>=e.banner.length&&(n=0),s(n)}function s(e){h!=e&&(h=e,$("li",n).removeClass("show").eq(h).addClass("show"),$(".dot a",n).removeClass("is_this").eq(h).addClass("is_this"))}if(0!=$(n).length){var o,h=-1,l=e.config.autoPlay_speed;t(),a()}};