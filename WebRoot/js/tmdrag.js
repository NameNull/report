(function($){
	$.fn.tmDrag = function(options){
		var opts = $.extend({},$.fn.tmDrag.defaults,options);
		this.each(function(){
			opts.target = $(this);
			opts = $.extend(opts,$.fn.tmDrag.parseOptions(opts.target));
			init(opts);
		});
	};
	var zindex = 10;
	function init(opts){
		var $drag = opts.target;
		var $handle = opts.handle ? $drag.find(opts.handle) : $drag;
		var isDraging = false;
		$drag.css("position","absolute");
		$handle.css("cursor", "move");
		var x =0,y=0,l=0,t=0;
		$handle.mousedown(function(e){
			zindex++;
			$drag.css("zIndex",zindex);
			x = e.clientX;//鼠标所在的x坐标
			y = e.clientY;//鼠标所在的y坐标
			l = $(this).offset().left;
			t = $(this).offset().top;
			isDraging = true;
		});

		/*滑动置顶*/
		$drag.mousemove(function(){
			zindex++;
			$drag.css("zIndex",zindex);
		});

		$(document).on("mousemove",function(e){
			if(isDraging){
				var newLeft = l + e.clientX - x;//新的左边距
				var newTop = t + e.clientY - y;//新的顶部边距
				if(newLeft<=1)newLeft=1;
				if(newTop<=1)newTop=1;
				$drag.css({"left":newLeft,"top":newTop});
			}
		}).on("mouseup",function(){
			isDraging = false;
		});	
	};
	
	$.fn.tmDrag.parseOptions = function(target) {
		var $target = $(target);
		return {
			handle : $target.attr("handle")
		};
	};
	$.fn.tmDrag.defaults = {
		handle : ""
	};
})(jQuery);