var zindex = 100;
var timerInterval = null;
var doMouseDownTimmer = null;
var isMouseDownDoing = false;
var ajaxTimeout = null;
(function($){
	$.tmUtil = {
		dialogHtml : function(opts){
			if(opts.single){$(".tmui-modal").remove();$(".tmui-overlay").remove();};
			var dialogHtml =  "<div class='tmui-modal magictime spaceInUp tmui-shadow-dark'>"+
			"		<div class='tmui-modal-header'><div class='tmui-modal-title fl'>"+opts.title+"</div><div class='tmui-modal-timer fl'></div></div>"+
			"		<div class='tmui-modal-toolbars'><button type='button' class='tmui-modal-close' title='关闭'><span class='tmui-modal-span'>×</span></button></div>"+
			"		  <div class='tmui-modal-body'>"+
			"		  	<div class='tmui-modal-icon' style='height: 140px;'><span class='tmui-ico-"+opts.icon+"'></span></div>"+
			"		  	<div class='tmui-modal-content'>"+opts.content+"</div>"+
			"		  </div>"+
			"		  <div class='tmui-modal-bottom'>"+
			"			<input type='button'  value='"+opts.cancleText+"' class='tmui-modal-cancle tmui-modal-gray'>"+
			"			<input type='button' value='"+opts.sureText+"' class='tmui-modal-sure tmui-modal-green'>"+
			"		  </div>"+
			"	</div>";
			return $(dialogHtml);
		},
		_position : function($obj,opts){
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			var left =opts.left || (windowWidth - $obj.width())/2;
			var top = opts.top || (windowHeight - $obj.height())/2;
			if(opts.open=="top"){
				$obj.css("left",left).stop().animate({top:top});
			}else if(opts.open=="left"){
				$obj.css("top",top).stop().animate({left:left});
			}else if(opts.open=="fade"){
				$obj.hide().css({left:left,top:top}).stop().fadeIn("slow");
			}else if(opts.open=="slide"){
				$obj.hide().css({left:left,top:top}).stop().slideDown("slow");
			}else if(opts.open=="message"){
				var left = $.tmUtil._getClientWidth()-opts.width-3;
				var top = $.tmUtil._getClientHeight()-opts.height-3;
				$obj.css({left:left,top:$.tmUtil._getClientHeight()}).stop().animate({top:"+"+top+"px"});
			}else{
				$obj.css({"left":left,"top":top});
			}
		},
		_resize : function($obj,opts){
			$(window).on("resize",function(){
				$.tmUtil._position($obj,opts);
				$obj.next(".tmui-overlay").height($.tmUtil._getScrollHeight());
			});
		},
		_overlay:function($dialog){
	    	var height = this._getScrollHeight();
	    	var zindexc = $dialog.css("z-index");
	    	zindexc--;
    		var $overLayObj = $('<div class="tmui-overlay" style="height:'+height+'px;z-index:'+zindexc+'"></div>');
    		$dialog.after($overLayObj);
	    },
		_getClientHeight : function() {
		    var clientHeight = 0;
		    if (document.body.clientHeight && document.documentElement.clientHeight) {
		        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
		    } else {
		        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
		    }
		    return clientHeight;
		},
		_getClientWidth : function() {
		    var clientWidth = 0;
		    if (document.body.clientWidth && document.documentElement.clientWidth) {
		        clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth: document.documentElement.clientWidth;
		    } else {
		        clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth: document.documentElement.clientWidth;
		    }
		    return clientWidth;
		},
		_getScrollHeight : function (){
			return  Math.max(this._getClientHeight(),document.body.scrollHeight,document.documentElement.scrollHeight);
		},
		_getHeight: function() {
	        return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
	    },
	    _getWidth: function() {
	        return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body.clientWidth;
	    },
		_showOpen : function($dialog,opts){
			zindex++;
			$dialog.css("zIndex",zindex);
			if(opts.open !="other"){
				$dialog.show().css({width:opts.width,height:opts.height,"margin":"none"});
				$("body").append($dialog);
				$.tmUtil._position($dialog,opts);
				$.tmUtil._resize($dialog,opts);
			}
			if(opts.open=="other"){
				if(opts.animateBefore=="before"){
					$dialog.css("margin","auto").show().stop().animate({width:opts.width,height:opts.height});
					$("body").append($dialog);
				}
				if(opts.animateBefore=="after"){
					$("body").append($dialog);
					$dialog.css("margin","auto").show().stop().animate({width:opts.width,height:opts.height});
				}
			}
		},
		_animateClose : function($obj,opts){
			var height = $obj.offset().top+$obj.height()*2;
			var width = $obj.offset().left+$obj.width()*2;
			if(opts.open=="top"){
				$obj.stop().animate({top:"-"+height+"px"},function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else if(opts.open=="left"){
				$obj.stop().animate({left:"-"+width+"px"},function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else if(opts.open =="fade"){
				$obj.stop().fadeOut("slow",function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else if(opts.open=="slide"){
				$obj.stop().slideUp("slow",function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else if(opts.open=="other"){
				$obj.stop().animate({width:0,height:0},function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else if(opts.open=="message"){
				$obj.stop().animate({top:$.tmUtil._getClientHeight()},function(){
					if(opts.showOverlay)$(this).next().remove();
					$(this).remove();
				});
			}else{
				if(opts.showOverlay)$obj.next().remove();
				$obj.remove();
			}
		},
		_shake : function (obj){
		    var style = obj.style,
		        p = [14, 18, 14, 10, -14, -18, -14, 10,12,0,-12,11],
		        fx = function () {
		            style.marginLeft = p.shift() + 'px';
		            if (p.length <= 0) {
		                style.marginLeft = 0;
		                clearInterval(timerId);
		            };
		        };
		    p = p.concat(p.concat(p));
		    timerId = setInterval(fx, 13);
		},
		_overlayClick:function($dialog,opts){
			$dialog.next().click(function(e){
				$.tmUtil._animateClose($dialog,opts);
				stopBubble(e);
			});
		}
	};
	
	$.tmDialog = {
		alert :function(options){
			var $dialog = this._init(options);
			$dialog.find(".tmui-modal-cancle").remove();
		},
		confirm :function(options){
			if(isEmpty(options.icon))options.icon = "warn";
			this._init(options);
		},
		sure:function(options){
			options.showClose = false;
			this._init(options);
		},
		show:function(options){
			options.showIcon = false;
			this._init(options);
		},
		html:function(options){
			options.showIcon = false;
			var $dialog = this._init(options);
			var opts = $dialog.data("options");
			if(opts.content instanceof jQuery){
				opts.content.show();
				opts.content = opts.content.clone();
			}
			$dialog.find(".tmui-modal-body").css({"overflowX":"hidden","overflowY":"auto"}).html(options.content);
			$dialog.find(".tmui-modal-sure").off().on("click",function(){
				if(opts.validator($dialog)){
					if(opts.callback)opts.callback(true);
					$.tmDialog._remove($dialog,opts);
					if(opts.content instanceof jQuery){
						$("body").append(opts.content.hide());
					}
				}
			});
		},
		prompt:function(options){
			options.showIcon = false;
			options.arrow = "left";
			var $dialog = this._init(options);
			var opts = $dialog.data("options");
			if(!eval(opts.textarea))$dialog.find(".tmui-modal-content").append("<p><input type='text'  class='tmui-modal-text tmui-modal-input' autoFocus='true' placeholder='请输入内容' value='"+opts.value+"'></p>");
			if(eval(opts.textarea))$dialog.find(".tmui-modal-content").append("<p><textarea class='tmui-modal-text tmui-modal-textarea' style='height:"+(opts.height-225)+"px' autoFocus='true' placeholder='请输入内容'>"+opts.value+"</textarea></p>");
			$dialog.find(".tmui-modal-input,.tmui-modal-textarea").select();
			$dialog.find(".tmui-modal-sure").off().on("click",function(){
				var $input = $dialog.find(".tmui-modal-text");
				if(isEmpty($input.val())){
					$input.focus();
					return;
				};
				if(opts.validator($input)){
					if(opts.callback)opts.callback($input.val(),$input);
					$.tmDialog._remove($dialog,opts);
				}else{
					$input.select();
				}
			});
		},
		ajax :function(options){
			var $dialog = this._init(options);
			$dialog.find(".tmui-modal-body").html("<div id='tmDialog_loading' style='position:absolute;top:50%;left:45%;'><img src='../images/loading.gif'><label style='font-size:12px;'>数据马上就来...</label></div>");
			$dialog.find(".tmui-modal-body").css({"overflowX":"hidden","overflowY":"auto"}).load(options.content,function(data){
				$dialog.find("#tmDialog_loading").remove();
				$(this).html($(data).find("body").html());
			});
		},
		iframe:function(options){
			options.showIcon = false;
			var $dialog = this._init(options);
			var opts = $dialog.data("options");
			$dialog.find(".tmui-modal-body").html("<div id='tmDialog_loading' style='position:absolute;top:50%;left:45%;'><img src='../images/loading.gif'><label style='font-size:12px;'>数据马上就来...</label></div>");
			var iframeHeight = opts.height-55;
			if(opts.showBottom){
				$dialog.find(".tmui-modal-bottom").css({"borderTop":"1px solid #f9f9f9","paddingTop":10});
				iframeHeight = opts.height-125;
			}
			var iframe=document.createElement("iframe");
			iframe.id = "tmDialog_iframe";
			iframe.width= opts.width;
			iframe.height = iframeHeight;
			iframe.scrolling = "yes";
			iframe.frameborder ="0";
			if(opts.content.indexOf("?")==-1){
				opts.content+="?dialog=true";
			}else{
				opts.content+="&dialog=true";
			}
			iframe.src=opts.content;
			iframe.style.display ="none";
			$(iframe).attr("frameborder","0");
			$dialog.find(".tmui-modal-body").append(iframe);
			var $iframeObj,$this;
			$(iframe).load(function(){
				$dialog.find("#tmDialog_loading").remove();
				iframe.style.display ="block";
				$iframeObj = $(this);
				$this = $iframeObj.contents();
				var $parent = $(parent.document);
				$dialog.find(".tmui-modal-cancle,.tmui-modal-close").off().on("click",function(){
					if(opts.callback)opts.callback(false);
					$.tmDialog._remove($dialog,opts);
				});
				
				opts.loadSuccess($iframeObj.get(0).contentWindow,$this,$dialog,$parent,opts);
				$dialog.find(".tmui-modal-sure").off().on("click",function(){
					if(opts.callback)opts.callback($iframeObj.get(0).contentWindow,$this,$dialog,$parent,opts);
				});
			});
			
		},
		message:function(options){
			options.arrow = "center";
			options.open = "message";
			options.showOverlay = false;
			options.drag = false;
			options.single=true;
			var $dialog = this._init(options);
			var opts = $dialog.data("options");
			$(window).off().resize(function(){
				var left = $.tmUtil._getClientWidth()-opts.width-3;
				var top = $.tmUtil._getClientHeight()-opts.height-3;
				$dialog.css({left:left,top:top});
			});
			if(opts.showMin){
				$dialog.find(".tmui-modal-toolbars").append("<button type='button' class='tmui-modal-min' title='最小化'><span class='tmui-modal-span'>-</span></button>");
				$dialog.find(".tmui-modal-min").on("click",function(){
					var text = $(this).find(".tmui-modal-span").text();
					if(text=='-'){
						$dialog.stop().animate({top:$.tmUtil._getClientHeight()-55});
						$(this).find(".tmui-modal-span").text("□");
					}else{
						var left = $.tmUtil._getClientWidth()-opts.width-3;
						var top = $.tmUtil._getClientHeight()-opts.height-3;
						$dialog.css({left:left,top:$.tmUtil._getClientHeight()-55}).stop().animate({top:"+"+top+"px"});
						$(this).find(".tmui-modal-span").text("-");
					}
				});
			}
		},
		_init:function(options){
			var opts = $.extend({},$.tmDialog,$.tmDialog.defaults,options);
			//if(isEmpty($("#tm_loginuser_container").html()))return;
			var $dialog = $.tmUtil.dialogHtml(opts);
			if(isNotEmpty(opts.id))$dialog.attr("id",opts.id);
			$dialog.data("options",opts);
			$.tmUtil._showOpen($dialog,opts);//打开特效
			this._bindEvent($dialog,opts);//绑定事件
			if(!eval(opts.showIcon))$dialog.find(".tmui-modal-icon").remove();
			if(opts.drag)$dialog.tmDrag({handle:$dialog.find(".tmui-modal-header")});//是否允许拖动
			if(opts.width<=360)opts.width = 360;
			if(opts.height<=200)opts.height = 260;
			if(opts.showOverlay)$.tmUtil._overlay($dialog);//是否有阴影层
			if(opts.showHeader){$dialog.find(".tmui-modal-header").hide();}
			
			if(eval(opts.showIcon)){
				$dialog.find(".tmui-modal-content").width(opts.width-148);
			}else{
				$dialog.find(".tmui-modal-content").css({"width":(opts.width-100),"textAlign":opts.arrow||"center","padding":0,"padding":50});
			}
			
			if(!eval(opts.showBottom)){
				$dialog.find(".tmui-modal-bottom").remove();
				var h = opts.height-55;
				$dialog.height(h).find(".tmui-modal-body").height(h);
			}else{
				$dialog.find(".tmui-modal-body").height(opts.height-125);
			}
			if(!eval(opts.showClose)){
				$dialog.find(".tmui-modal-close").remove();
				$dialog.find(".tmui-modal-cancle").remove();
			}
			
			if(eval(opts.overlayHide))$.tmUtil._overlayClick($dialog,opts);
			if(eval(opts.colors).length>0){
				var colorx = eval(opts.colors);
				$dialog.find(".tmui-modal-header").css({"background":colorx[0]});
				$dialog.find(".tmui-modal-sure").css({"background":colorx[1]||colorx[0]});
				$dialog.find(".tmui-modal-cancle").css({"background":colorx[2]||colorx[0]});
			}
			if(isNotEmpty(opts.timer))this._timer($dialog,opts);
			if(eval(opts.shake))$.tmUtil._shake($dialog.get(0));
			if(isNotEmpty(opts.left))$dialog.css("left",opts.left);
			if(isNotEmpty(opts.top)){$dialog.css("top",opts.top);}
			if(isNotEmpty(opts.zindex)){
				$dialog.css("zIndex",opts.zindex).next().css("zIndex",opts.zindex-1);
			}
			return $dialog;
		},
		
		_limitRandom : function (begin,end){
			 return Math.floor(Math.random()*(end-begin))+begin;
		},
		_bindEvent :function($dialog,opts){
			$dialog.find(".tmui-modal-cancle,.tmui-modal-close").off().on("click",function(e){
				if(opts.callback)opts.callback(false);
				$.tmDialog._remove($dialog,opts);
				if(opts.content instanceof jQuery){
					$("body").append(opts.content.hide());
				}
			});
			
			$dialog.find(".tmui-modal-sure").off().on("click",function(){
				if(opts.callback)opts.callback(true);
				$.tmDialog._remove($dialog,opts);
			});
		},
		_timer : function($dialog,opts){
			var timecount = opts.timer*1000 / 1000;
			clearInterval(timerInterval);
			timerInterval = setInterval(function(){
				$dialog.find(".tmui-modal-timer").html("("+timecount+")");
				if(timecount<=1){
					$.tmUtil._animateClose($dialog,opts);
					clearInterval(timerInterval);
					/*$dialog.slideUp(400,function(){
						opts.finish();
						$.tmDialog._remove($(this),opts);
						clearInterval(timerInterval);
					});*/
				}
				timecount--;
			},1000);
		},
		_remove : function($dialog,opts){
			if(timerInterval)clearInterval(timerInterval);
			$.tmUtil._animateClose($dialog,opts);
		},
		_zindex:function(){
			var arr = [];
			$(".tmui-modal").each(function(){
				arr.push($(this).css("z-index"));
			});
			var max = Math.max.apply({},arr)*1 || 100;
			max++;
			return max;
		},
		window : function(options){
			options = $.extend({},$.tmDialog.defaults,options);
			var $wp = $("#tm_window_"+options.id);
			if(isNotEmpty($wp.html())){
				var max = $.tmDialog._zindex();
				$wp.show().css({"zIndex":max});
				$wp.next().css({"zIndex":(max-1)});
				return;
			}
			options.id = "tm_window_"+options.id;/*给id重命名*/
			options.showBottom = false;
			options.showIcon = false;
			if(!options.showCenter){//是否居中显示
				options.top = this._limitRandom(30,60);
				options.left = this._limitRandom(300,400);
			}
			var $window = this._init(options);
			$window.find(".tmui-modal-body").html("<div id='tmDialog_loading' style='position:absolute;top:50%;left:45%;'><img src='images/loading.gif'><label style='font-size:12px;'>数据马上就来...</label></div>");
			if(!options.ajax){
				var iframe=document.createElement("iframe");
				iframe.id = "tmiframe_"+options.id ;
				iframe.width= options.width;
				iframe.height = options.height;
				iframe.scrolling = "auto";
				iframe.frameborder = "no";
				iframe.src = options.content;
				iframe.style.display ="none";
				iframe.style.border ="0";
				$(iframe).attr("frameborder","no");
				$window.find(".tmui-modal-body").css({"overflowX":"hidden","overflowY":"auto","height":options.height}).append(iframe);
				$(iframe).load(function(){
					$window.find("#tmDialog_loading").remove();
					iframe.style.display ="block";
				});
			}else{
				$window.find(".tmui-modal-body").css({"height":options.height}).load(options.content,function(){
					$window.find(".tmui-modal-close-proxy").on("click",function(){
						$window.fadeOut("slow",function(){
							$window.next().remove();
							$window.remove();
						});
					});
					$window.tmDrag({handle:$window.find(".tmui-drag-header")});//是否允许拖动
				});
			}
			
			$window.find(".tmui-modal-header").css("paddingLeft",3).prepend("<div class='fl' style='padding-top:4px;padding-right:5px;'><img src='"+options.wicon+"' width='22' height='23'/></div>&nbsp;");
			$window.find(".tmui-modal-toolbars").append("<button type='button' title='最大化' class='tmui-modal-max'><span class='tmui-modal-span'>□</span></button><button type='button' title='最大小化' class='tmui-modal-min'><span class='tmui-modal-span'>-</span></button>");
			$window.find(".tmui-modal-min").on("click",function(){
				$window.tmDrag({handle:$window.find(".tmui-modal-header")});//是否允许拖动
			});
			var max = $.tmDialog._zindex();
			$window.show().css("zIndex",max);
			$window.next().css({"zIndex":(max-1)});
			/*附加代理层*/
			$("#tmui_resizable").remove();
			$("body").append("<div id='tmui_resizable'></div>");
			/*添加resize边角*/
			$window.append("<div class='tmui-resize tmui-resize-ll'></div>" +
					"<div class='tmui-resize tmui-resize-tt'></div>" +
					"<div class='tmui-resize tmui-resize-rr'></div>" +
					"<div class='tmui-resize tmui-resize-bb'></div>" +
					"<div class='tmui-resize tmui-resize-tr'></div>" +
					"<div class='tmui-resize tmui-resize-tl'></div>" +
					"<div class='tmui-resize tmui-resize-br'></div>" +
					"<div class='tmui-resize tmui-resize-bl'></div>");
			/*最大化*/
			$window.find(".tmui-modal-max").off().on("click",function(){
				var open = $(this).data("open");
				var max = $.tmDialog._zindex();
				$window.css("zIndex",max);
				var width = $.tmUtil._getClientWidth();
				var height = $.tmUtil._getClientHeight();
				if(isEmpty(open)){
					var styleData = $window.attr("style");
					$(this).data({"open":"open","style":styleData});
					$window.css({left:0,top:1,width:"100%",height:height-70});
					$(this).find("span").text("■");
					$window.find(".tmui-modal-header").css("cursor","default").off();
					$window.find("iframe").height(height).width(width);
					$window.find(".tmui-modal-body").height(height).width(width);
				}else{
					$window.attr("style",$(this).data("style"));
					$window.find("iframe").height($window.height()).width($window.width());
					$window.find(".tmui-modal-body").height(height).width(width);
					$window.tmDrag({handle:$window.find(".tmui-modal-header")});//是否允许拖动
					$(this).find("span").text("□");
					$(this).removeData("open");
					$(this).removeData("style");
				}
				if(options.maxcallback)options.maxcallback($window,options);
			});
			
			$window.find(".tmui-modal-min").off().on("click",function(){
				if(options.mincallback)options.mincallback($window,options);
				var max = $.tmDialog._zindex();
				$window.css("zIndex",max);
			});
			
			if(!options.showMax){
				$window.find(".tmui-modal-min").css("right",45);
				$window.find(".tmui-modal-max").remove();
			}
			
			if(!options.showMin)$window.find(".tmui-modal-min").remove();
			if(!options.showHeader){
				$window.find(".tmui-modal-header").css({"position":"absolute","width":"100%","height":47,"zIndex":2});
				$window.hover(function(){
					$(this).find(".tmui-modal-header").show();
				},function(){
					$(this).find(".tmui-modal-header").hide();
				});
			}
			
			if(!options.removeHeader){
				$window.find(".tmui-modal-header").remove();
			}
			if(options.showResize){
				var windowDom = $window.get(0);
				var oL = $window.find(".tmui-resize-ll").get(0);
				var oT = $window.find(".tmui-resize-tt").get(0);
				var oR = $window.find(".tmui-resize-rr").get(0);
				var oB = $window.find(".tmui-resize-bb").get(0);
				var oLT = $window.find(".tmui-resize-tr").get(0);
				var oTR = $window.find(".tmui-resize-tl").get(0);
				var oBR = $window.find(".tmui-resize-br").get(0);
				var oLB = $window.find(".tmui-resize-bl").get(0);
				
	
				/*四角*/
				this._windowResize(windowDom, oLT, true, true, false, false,options);
				this._windowResize(windowDom, oTR, false, true, false, false,options);
				this._windowResize(windowDom, oBR, false, false, false, false,options);
				this._windowResize(windowDom, oLB, true, false, false, false,options);
				/*四边*/
				this._windowResize(windowDom, oL, true, false, false, true,options);
				this._windowResize(windowDom, oT, false, true, true, false,options);
				this._windowResize(windowDom, oR, false, false, false, true,options);
				this._windowResize(windowDom, oB, false, false, true, false,options);
			}else{
				$window.find(".tmui-resize").remove();
			}
		},
		_windowResize : function(oParent, handle, isLeft, isTop, lockX, lockY,opts){
			var dragMinWidth = opts.limitWidth;
			var dragMinHeight = opts.limitHeight;
			handle.onmousedown = function (event){
				var max = $.tmDialog._zindex();
				$(oParent).css("zIndex",max);
				var e = event || window.event;
				var disX = e.clientX - handle.offsetLeft;
				var disY = e.clientY - handle.offsetTop;
				var iParentTop = oParent.offsetTop;
				var iParentLeft = oParent.offsetLeft;
				var iParentWidth = oParent.offsetWidth;
				var iParentHeight = oParent.offsetHeight;
				document.onmousemove = function (event){
					var e = event || window.event;
					var iL = e.clientX - disX;
					var iT = e.clientY - disY;
					var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
					var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
					var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
					var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
					isLeft && (oParent.style.left = iParentLeft + iL + "px");
					isTop && (oParent.style.top = iParentTop + iT + "px");
					iW < dragMinWidth && (iW = dragMinWidth);
					iW > maxW && (iW = maxW);
					lockX || (oParent.style.width = iW + "px");
					iH < dragMinHeight && (iH = dragMinHeight);
					iH > maxH && (iH = maxH);
					lockY || (oParent.style.height = iH + "px");
					if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
					$(oParent).find("iframe").height(iH).width(iW);
					$(oParent).find(".tmui-modal-body").height(iH).width(iW);
					return false;
				};
				document.onmouseup = function (){
					document.onmousemove = null;
					document.onmouseup = null;
				};
				return false;
			};
		}
	};
	
	
	$.tmDialog.defaults = {
		id:"",//标示符
		ajax:false,
	    open:"top",//打开方式。如果是default的话没有动画效果 //关闭动画的效果 fade left top default slide,other
	    animateBefore:"before",//如果open不是默认的动画效果，如果为true打开为前置动画，false为后置动画
		position:"fixed",//定位方式
		single:false,//是否采用单例模式
		width:362,//宽度
		height:252,//高度
		colors:[],//换肤
		drag:true,//是否允许拖拽
		shake:false,//是否抖动代开
		showIcon:true,//是否显示图标
		showBottom:true,//是否显示底部
		showHeader:false,//是否显示头部
		showResize:true,//是否resize
		showMin:true,//是否显示最小化
		showMax:true,//是否显示最大化
		showClose:true,//是否显示关闭
		showCenter:false,//默认随机显示位置
		showOverlay:true,//是否需要阴影层
		removeHeader:true,//删除头
		zindex:"",
		overlayHide:false,//
		icon:"success",//默认按钮
		limitWidth :360,//resize限制宽度
		limitHeight:88,//resize限制宽度
		wicon:"",//窗体图标
		message:false,//消息设置
		title:"提示",//标题
		value:"",//prompt的值
		left:"",//设定left
		top:"",//设定top
		timer:"",//几秒关闭
		content:"请输入内容....",//显示的内容
		cancleText:"取消",//取消按钮文件
		sureText :"确定",//确定按钮文件
		textarea:false,//prompt的展示
		finish:function(){
			
		},
		loadSuccess:function(){
			
		},
		validator:function($input){
			return true;
		},
		callback:function(ok){
			
		},
		mincallback:function(){
			
		},
		maxcallback:function(){
			
		}
	};
	
	$.fn.tmDrag = function (settings) {
		return this.each(function () {
			var $drag = $(this),options = $.extend({},$.fn.tmDrag.defaults,$.fn.tmDrag.defaults.parseOptions(this),settings),
			// 拖动对象
			$handle = options.handle ? $drag.find(options.handle) : $drag,
			// 拖动区域对象
			$zoom = $(options.zoom),
			// 拖动开始的位置
			startPos = {},
			dragFix = {},
			// body 默认 cursor
			cursor = $("body").css("cursor"),
			// 默认的 zIndex 值
			zIndex = $drag.css("z-index"),
			// 是否正在拖动
			isDraging = 0,ghsotDiv;
			$handle.css("cursor", "move");
			_checkPosition($drag);
			if(!options.isDrag)return;
			// html4 拖拽
			$handle.mousedown(function (e) {
				var evt = e || event;
				if(evt.which==3 || evt.button==2)return;
				var left = $drag.offset().left;
				var top = $drag.offset().top;
				$drag.css({top:top,left:left,"margin":0,"position":"absolute"});
				if(options.ghsot){ghsotDiv = options.ghsotEvent($drag);}
				if (!isDraging) {
					_ondragstrart(e);
					return false;
				}
			});
			
			$(document).mousemove(function (e) {
				if (isDraging) {
					_ondragpos(e);
					return false;
				}
			}).mouseup(function (e) {
				if (isDraging) {
					_ondragpos(e, true);
					return false;
				}
			});

			/**
			 * 检查拖动对象的position
			 * @return {undefined}
			 */
			function _checkPosition() {
				if (!$drag.css("position")) {
					$drag.css({
						position: "absolute",
						left: 0,
						top: 0
					});
				}
			}
			
			/**
			 * 开始拖动
			 * @param  {Object} event对象
			 * @return {undefined}
			 */

			function _ondragstrart(e) {
				isDraging = 1;
				startPos.screenX = e.screenX;
				startPos.screenY = e.screenY;
				startPos.left = $drag.offset().left;
				startPos.top = $drag.offset().top;
				$parentbox = options.parent;
				boxHeight = $(window).height()+$(window).scrollTop()-($drag.height()/5);
			    boxWidth = $.tmUtil._getClientWidth()-($drag.width()/5);
				if($parentbox){
					limitLeft =$parentbox.offset().left;
					limitTop = $parentbox.offset().top;
					//limitWidth = $parentbox.width();
					//limitHeight = $parentbox.height();
				}
				var max = $.tmDialog._zindex();
				$drag.css("zIndex",max);
				options.ondragstart.call($drag, e);
				$("body").css("cursor", "move");
			}
			
			/**
			 * 改变拖拽位置
			 * @param  {Object} event对象
			 * @return {undefined}
			 */

			function _ondragpos(e, isStop) {
				// 正在拖动并且不支持html5
				if (isDraging) {
					var _left = e.screenX - startPos.screenX + startPos.left;
					var _top = e.screenY - startPos.screenY + startPos.top;
					if($parentbox){
						if(_left<limitLeft)_left=limitLeft+3;
						if(_top<limitTop)_top=limitTop+3;
						if(_top>boxHeight)_top = boxHeight+8;
						if(_left>boxWidth)_left=boxWidth+8;
					}else{
						if(_left<(boxWidth*-1))_left= boxWidth*-1;
						if(_top<2)_top=2;
						if(_left>boxWidth)_left = boxWidth;
						if(_top>boxHeight)_top=boxHeight-options.arrowTop;
					}
					
					if(isNotEmpty(options.arrow) && options.arrow=="left"){
						_top = $drag.offset().top;
					}
					if(isNotEmpty(options.arrow) && options.arrow=="top"){
						_left = $drag.offset().left;
					}
					
					dragFix.left = _left;
					dragFix.top = _top;
					/*镜像处理*/
					if(options.ghsot){
						ghsotDiv.css({left:_left+"px",top:_top+"px"});
					}else{
						/*普通处理*/
						$drag.offset({left: _left,top: _top});
					}
				}
				// 停止
				if (isStop && isDraging) {
					if(options.ghsot){
						$drag.css({left:dragFix.left,top:dragFix.top});
						ghsotDiv.remove();
					}
					//$drag.css("z-index", zIndex);
					isDraging = 0;
					options.ondragend.call($drag, e);
					$("body").css("cursor", cursor);
				} else {
					options.ondrag.call($drag, e);
				}
			}
		});
	};

	$.fn.tmDrag.defaults = {
		// 鼠标操作区域
		handle: "",
		parent:"",
		arrow:"",
		arrowTop:30,
		isDrag:true,
		// 拖动的时候层级的高度
		zIndex: 999,
		// 拖动开始回调
		ondragstart: function () {},
		// 拖动中回调
		ondrag: function () {},
		// 拖动结束回调
		ondragend: function () {},
		ghsot:true,
		ghsotEvent:function($this){
			var ghsotDiv = $("<div class='ghsot'><div>");
			var selfHeight = $this.outerHeight(true);//容器自身的高度加border
			var selfWidth = $this.outerWidth(true);//容器自身的宽度加border
			var $offset = $this.offset();
			$("body").append(ghsotDiv);
			ghsotDiv.css({zIndex:999,border:"2px dotted #f9f9f9","boxShadow":"0px 0px 1.5em #111",opacity:0.35,position:"absolute",width:selfWidth,height:selfHeight,left:$offset.left,top:$offset.top});
			return ghsotDiv;
		}
	};
	
	$.fn.tmDrag.defaults.parseOptions = function(target){
		var $this = $(target);
		var ghsot = true;
		var arrow = "";
		var parent = "";
		var handle = "";
		var ghsotp = $this.attr("ghsot");
		var arrowp = $this.attr("arrow");
		var parentp = $this.attr("parent");
		var handlep = $this.attr("handle");
		if(isNotEmpty(ghsotp) && ghsotp=="false")ghsot=false;
		if(isNotEmpty(arrowp))arrow = arrowp;
		if(isNotEmpty(parentp))parent = $("#"+parentp);
		if(isNotEmpty(handlep))handle = $("#"+handlep);
		return {
			ghsot:ghsot,
			arrow:arrow,
			parent:parent,
			handle:handle
		};
	};
	
	$.tmLoading = function(content,options){
		var opts = $.extend({},$.tmLoading.defaults,options);
		if($(".tmui-loading").length==0)$("body").append('<div class="tmui-loading" title="click close me!"><span id="tm-loading-content"></span></div>');
		var $loading = 	$(".tmui-loading");
		if(opts.skin=="black"){
			$(".tmui-loading").css({background:"#222","color":"#fff","border":"1px solid #555"});
		}
		if(opts.overlay){
			var overlayHeight = Math.max($.tmUtil._getClientHeight(),document.body.scrollHeight,document.documentElement.scrollHeight);
			$("body").append("<div class=\"tmui_loading_overlay\" style=\"z-index: 1001; height: 100%; display: none;\"></div>");
			$(".tmui_loading_overlay").on("click",function(){
				$loading.slideUp(250,function(){
					$(this).remove();
					clearInterval(loadingTimer);
				});
				$(this).remove();
			}).css({"opacity":"0.6","z-index":"999","height":overlayHeight}).show();
		}
		if(!opts.showLoad)$loading.find("#tm-loading-content").css("background","none");
		if(content=="remove"){
			$loading.slideUp(250,function(){
				opts.timeSuccess($loading);
				$(".tmui_loading_overlay").remove();
				if(opts._remove)$loading.remove();
			});
		}else{
			if(isEmpty(content))content = opts.content ;
			$loading.show().find("#tm-loading-content").html(content);
			var selfWidth = $loading.width();
			var selfHeight = $loading.height();
			var left = ($.tmUtil._getClientWidth()-selfWidth)/2;
			var top = ($.tmUtil._getHeight()-selfHeight)/2;
			if(isNotEmpty(opts.left))left= opts.left;
			if(isNotEmpty(opts.top))top = opts.top;
			$loading.css({left:left,top:top});
			opts.callback($loading,opts);
			var loadingTimer = null;
			if(opts.timer>0){
				loadingTimer = setTimeout(function(){
					$loading.slideUp(250,function(){
						clearInterval(loadingTimer);
						opts.timeSuccess($loading);
						$(".tmui_loading_overlay").remove();
						if(opts._remove)$loading.remove();
				});},opts.timer*1000);
			}else{
				$(".tmui_loading_overlay").remove();
				if(opts._remove)$loading.remove();
			}
		}
	};
	
	$.tmLoading.defaults = {
		top:"",
		left:"",
		timer:0,
		_remove:false,
		skin:"black",
		content:"loading...",
		showLoad:true,
		overlay:false,
		timeSuccess:function(){
			
		},
		callback:function($this,opts){
			if(opts._remove){
				$this.on("click",function(){
					$this.slideUp(250,function(){
						$(this).remove();
					});
					$(".tmui_loading_overlay").remove();
				});
			}else{
				$this.on("click",function(){
					$this.slideUp(250,function(){
						$(this).hide();
					});
					$(".tmui_loading_overlay").remove();
				});
			}
		}
	};
	/*loading plugin end*/
	/*tmAjax*/
	$.tmAjax = {
		request : function(options,dataJson){
			var opts = $.extend({},{limit:true,beforeSend:function(){
				//tmLoading("数据处理中,请稍后...",1);
			},error:function(){
				
			},callback:function(data){
				
			}},options);
			var _url = opts.url;
			if(isEmpty(_url)){
				_url = jsonPath+"/"+opts.model+"/"+opts.method+"?ajax=true";
			}
			if(isNotEmpty(opts.params)){
				_url+="&"+opts.params;
			}
			
			if(opts.limit){
				clearTimeout(ajaxTimeout);
				ajaxTimeout = setTimeout(function(){
					$.tmAjax.ajaxMain(opts,_url,dataJson);
				},200);
			}else{
				$.tmAjax.ajaxMain(opts,_url, dataJson);
			}
		},
		ajaxMain:function(opts,_url,dataJson){
			$.ajax({
				type:"post",
				data : dataJson,
				url : _url,
				beforeSend:function(){opts.beforeSend();},
				error:function(){tmLoading("抱歉！因为操作不能够及时响应，请稍后在试...",1);opts.error();clearTimeout(ajaxTimeout);},
				success:function(data){
					if(data.result=="logout"){
						$.tmLogin._dialogLogin();
					}else if(data.result=="noPermission"){
						tm_showDialog({content:"非常抱歉您没有权限!"});
					}else if(data.result=="frontLogout"){
						//tmLoading("请登录!");
						tm_login_dialog();
					}else{
						if(opts.callback)opts.callback(data);
					}
					clearTimeout(ajaxTimeout);
				}
			});
		}
	};
	
	/*右键菜单*/
	$.fn.tmMenu = function(options){
		return this.each(function(){
			var opts = $.extend({},$.fn.tmMenu.defaults,$.fn.tmMenu.methods,options,$.fn.tmMenu.parseOptions($(this)));
			opts.init($(this),opts);
		});
	};
	
	$.fn.tmMenu.methods = {
		init:function($this,opts){
			$this.removeData("menu").on("mousedown",function(e){
				var evt = e || event;
				if(evt.which==3 || evt.button==2){
					 $(this).find("*").removeClass(opts.onClass);
					 var menuName = $(this).data("menu");
					 var tag = evt.srcElement || evt.target;
					 var tagName = tag.tagName.toLowerCase();
					 var $menu = null;
					 var off = $(this).attr("off");
					 if(isNotEmpty(off))return;
					 if(menuName=="tm-all-menu"){
						  $menu = $("#"+menuName);
					 }else{
						 $("."+opts.onClass).removeClass(opts.onClass);
						 $(this).addClass(opts.onClass);
						 $menu = $("#"+opts.menuName);
					 }
					 $.fn.tmMenu.methods._postion(evt,$menu,opts);
					 if(tagName=="body" && menuName=="tm-all-menu"){
						 $("body").removeClass(opts.onClass);
						 $("body").find("*").removeClass(opts.onClass).removeData("menu");
					 }
					 opts.callback($this);
					 stopBubble(evt);
				}
			});
		},
		
		_postion : function(evt,$menu,opts){
			 var pox = tm_posXY(evt).x+5;
			 var poy = tm_posXY(evt).y+5;
			 var boxWidth = getClientWidth();
			 var boxHeight = getClientHeight();
			 var menuWidth = $menu.width();
			 var menuHeight = $menu.height();
			 if((poy+menuHeight)>boxHeight){
				 poy = boxHeight - menuHeight - 70; 
			 };
			 if((pox+menuWidth)>boxWidth){
				 pox = boxWidth - menuWidth; 
			 };
			 $(".tmMenu").hide();//隐藏其他的菜单
			 $menu.css({left:pox,top:poy+opts.offsetTop}).show();
			 
		}
	};
	
	$.fn.tmMenu.parseOptions = function($target){
		return {menuName:$target.data("menu")};
	};
	
	
	$.fn.tmMenu.defaults = {
		items: "tmui-items",
		menuName:"tm-menu",
		onClass:"tmui-items-on",
		offsetTop :0,
		callback:function($this){
			
		},
		_siblings:function(){
			
		}	
	};
	
	
	
	/*date*/
	$.fn.tmDate = function(options){
		this.each(function(){
			
			$.fn.tmDate.methods.init($(this),options); 
		});
	};
	var timer = null;
	$.fn.tmDate.methods = {
		init : function($this,options){
			var $parent =this;
			$this.off().on("click",function(e){
				if($(".tmui-datepicker").is(":visible")){
					$(".tmui-datepicker").hide();
					return;
				}
				var opts = $.extend({},$.fn.tmDate.defaults,options);
				var currentDate = new Date();
				if(isEmpty(opts.year))opts.year = currentDate.format("yyyy");
				if(isEmpty(opts.month))opts.month = currentDate.format("MM");
				if(isEmpty(opts.day))opts.day = currentDate.format("dd");
				var $dateObj = $parent.dateTemplate(opts);
				$("body").append($dateObj.show());
				$dateObj.css({width:opts.width});
				if(isEmpty(opts.right))$parent._position($dateObj,$this);//初始化位置
				$parent.getMonthTemplate($dateObj,opts);//初始化月份
				$parent.initDays($dateObj,$this,opts);//初始化天数
				$parent._arrowEvent($dateObj,$this,opts);//初始化方向事件
				if(opts.finish)opts.finish($(this));
				if(isNotEmpty(opts.left))$dateObj.css("left",opts.left);
				if(isNotEmpty(opts.top))$dateObj.css("top",opts.top);
				if(isNotEmpty(opts.right))$dateObj.css({"right":opts.right,"left":"none"});
				if(isNotEmpty(opts.bottom))$dateObj.css({"bottom":opts.bottom,"top":"none"});
				stopBubble(e);
			});		
		},
		_position:function($dateObj,$this){
			var $offset = $this.offset();
			var top = $offset.top+$this.height()+3;
			var left = $offset.left;
			$dateObj.css({top:top,left:left});
		},
		getMonthTemplate:function($dateObj,opts){
			var html = "";
			for(var i=1;i<=12;i++){
				var flag = "";
				var dnone = "style='display:none'";
				if(opts.month==i){
					flag="tmui-active";
					dnone = "";
				}
				html += "<li data-y='"+opts.year+"' data-m='"+i+"' data-ym='"+opts.year+"/"+i+"' class='months "+flag+"' "+dnone+"><span class='colorwhite'>"+opts.year+"/"+i+"</span><span class='colordc'>月</span></li>";
			}

			$dateObj.find(".tmui-timer-bar").html(html);
		},
		getWeek:function(week){
			var result = "日";
			if(week==1)result="一";
			if(week==2)result="二";
			if(week==3)result="三";
			if(week==4)result="四";
			if(week==5)result="五";
			if(week==6)result="六";
			return result;
		},
		isLeapYear : function(opts){//判断是否是闰年
			return ((opts.year % 4==0 && opts.year%100!=0) || (opts.year%400==0));
		},
		_arrowEvent:function($dateObj,$this,opts){
			var $parent = this;
			$dateObj.find('.tm_sliderNext').off().on('click',function(e){
				var eqindex = $dateObj.find(".tmui-active").index();
				var $months = $dateObj.find(".months").eq(eqindex);
				var $next = $months.next();
				if($next.html()){
					$months.removeClass("tmui-active").hide();
					$next.addClass("tmui-active").show();
					$parent._changeYm($dateObj,$this,opts,$next.data("ym"));
				}else{
					opts.year = $dateObj.find(".tmui-active").data("y")*1+1;
					opts.month = 1;
					$parent.getMonthTemplate($dateObj,opts);
				}
				stopBubble(e);
			});

			$dateObj.find('.tm_sliderPrev').off().on('click',function(e){
				var eqindex = $dateObj.find(".tmui-active").index();
				var $months = $dateObj.find(".months").eq(eqindex);
				var $prev = $months.prev();
				if($prev.html()){
					$months.removeClass("tmui-active").hide();
					$prev.addClass("tmui-active").show();
					$parent._changeYm($dateObj,$this,opts,$prev.data("ym"));

				}else{
					opts.year = $dateObj.find(".tmui-active").data("y")*1-1;
					opts.month = 12;
					$parent.getMonthTemplate($dateObj,opts);
				}
				stopBubble(e);
			});
		},
		_changeYm:function($dateObj,$this,opts,yearmonth){
			var ym = yearmonth.split("/");
			opts.year = ym[0];
			opts.month = ym[1];
			this.initDays($dateObj,$this,opts);
		},
		_bindEvent:function($dateObj,$this,opts){
			$dateObj.find(".tmui-date").off().on("click",function(e){
				var date = $(this).data("date");
				var hms = "";
				var dateString = "";
				if(opts.format.indexOf(" ")!=-1){
					var df = opts.format.split(/(\s*\S*)$/);
					hms = new Date().format(df[1]);
					dateString = new Date(date+" "+hms).format(opts.format);
				}else{
					dateString = new Date(date).format(opts.format);
				}
				$this.val(dateString);
				$(this).css("background","red");
				var hoildayString = opts.holidays[$(this).data("md")];
				if(isNotEmpty(hoildayString)){
					$dateObj.find(".riqi").show().html(hoildayString);
					$dateObj.find(".directbg").removeAttr("style");
				}else{
					$dateObj.find(".riqi").hide().empty();
					$dateObj.find(".directbg").css("top",1);
				}
				if(opts.callback)opts.callback($dateObj,$this,$(this),dateString);//事件回调
				stopBubble(e);
			});
			/*$dateObj.on("mouseleave",function(){
				$(this).stop().fadeOut("slow",function(){$(this).remove();});
			});*/
		},
		initAnimate:function(){
			var count = $(".tmui-date").index();
			clearInterval(timer);
			timer = setInterval(function(){
				count++;
				$(".tmui-date").eq(count).css("background","red");
				$(".tmui-date").eq(count-1).filter(function(){
					if(!$(this).parent().attr("style")){
						$(this).css({"background":"none"});
					}else{
						$(this).css({"background":"green"});
					}
				});
			},80);
		},
		_hoverHigh:function($dateObj){
			$dateObj.find("tbody td").hover(function(){
				$(this).find("a").filter(function(){
					if(!$(this).parent().attr("style")){
						$(this).css("background","#354");
					}
				});
			},function(){
				$(this).find("a").filter(function(){
					if(!$(this).parent().attr("style")){
						$(this).css("background","#141414");
					}
				});
			});
		},
		initDays : function($dateObj,$this,opts){
			var year = opts.year*1;
			var month = opts.month*1;
			var days = 30;
			if(this.isLeapYear(year) && month == 2){
				days = 29;
			}else if(!this.isLeapYear(year) && month ==2){
				days = 28;
			}else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
				days = 31;
			}
			var date = new Date(year,month-1,1);
			var day = new Date().getDate();
			var week = date.getDay();//获取星期数
			var weekHtml = "<tr>";
			for(var i=0;i<=6;i++){
				if(i==0){
					weekHtml+="<td><span class='colorwhite'>日</span></td>";
				}else{
					weekHtml+="<td><span class='colorwhite'>"+this.getWeek(i)+"</span></td>";
				}
			}
			weekHtml += "</tr>";
			$dateObj.find(".tm-weekheader").html(weekHtml);
			var str = "";
			var j = 1;
			if(month<10)month="0"+month;
			while(true){
				str+="<tr>";
				for(var i=0;i<=6;i++){
					var kn = j;
					if(j<10)kn="0"+kn;
					var activeFlag = "";
					var holidMark = "";
					if(j==day && year==new Date().getFullYear()){
					//if(j==day && year==new Date().getFullYear() && month ==new Date().getMonth()+1){
						activeFlag = "style='background:green'";
					}
					
					if(opts.holidays[month+""+kn]){	
						holidMark = "<div class='xinghao'>*</div>";
					}
					if(j==1 && i==week){
						str+="<td id='tm-"+j+"' "+activeFlag+"><a class='tmui-date'  data-md='"+month+""+kn+"' data-date='"+year+"/"+month+"/"+kn+"' href='javascript:void(0);'>1</a>"+holidMark+"</td>";
						j++;
					}else if(j>1 && j<=days){
						str+="<td id='tm-"+j+"' "+activeFlag+"><a class='tmui-date'  data-md='"+month+""+kn+"'  data-date='"+year+"/"+month+"/"+kn+"' href='javascript:void(0);'>"+j+"</a>"+holidMark+"</td>";
						j++;
					}else{
						str+="<td>&nbsp;</td>";
					}
				}
				str+="</tr>";
				if(j>=days){
					break;
				}
			};

			var holidaystring = opts.holidays[month+""+new Date().format("dd")];
			if(isNotEmpty(holidaystring)){
				$dateObj.find(".riqi").show().html(holidaystring);
				$dateObj.find(".directbg").removeAttr("style");
			}else{
				$dateObj.find(".riqi").hide().empty();
				$dateObj.find(".directbg").css("top",1);
			}
			$dateObj.find(".tm-datebody").html(str);	
			this._bindEvent($dateObj,$this,opts);//格子事件
			this.initAnimate();
			this._hoverHigh($dateObj);
		},
        dateTemplate:function(opts){
			$(".tmui-datepicker").remove();
			var holidaystring = opts.holidays[opts.month+""+opts.day];
			var showFlag = "";
			var topShow = "";
			var holidMark = "";
			if(isEmpty(holidaystring)){
				showFlag  = "style='display:none'";
				topShow = "style='top:2px;'";
				holidMark = "<div class='xinghao'>*</div>";
			}
			var html = "<div class='tmui-datepicker slideboxRight'>"+
			"			<div class='Timescrollbox'>"+
			"				<div class='tm_sliderBox timescroolre'>"+
			"					<div class='riqi' "+showFlag+">"+holidaystring+
			"					</div>"+
			"					<div class='tm_sliderPrev directbg prebg' "+topShow+"><span class='sliderPrev'></span></div>"+
			"					<div class='tm_sliderNext directbg nextbg' "+topShow+"><span class='sliderNext'></span></div>"+
			"					<div class='tm_sliderItem scrolllist'>"+
			"						<ul class='clearfix tmui-timer-bar' style='margin-top:1px;'></ul>"+
			"					</div>"+
			"				</div>"+
			"				<div class='lines0'></div>"+
			"				<div class='ui-datepicker'>"+
			"					<table class='ui-datepicker-calendar'> "+
			"						<thead class='tm-weekheader'></thead>"+
			"						<tbody class='tm-datebody'></tbody>"+
			"					</table>"+
			"				</div>"+
			"		   </div>"+
			"		</div>";
			return $(html);
		}
	};


	$.fn.tmDate.defaults = {
		year:"",
		month:"",
		day:"",
		left:"",
		top:"",
		right:"",
		bottom:"",
		hoilday:"春节",
		width:257,
		format:"yyyy-MM-dd HH:mm:ss",
		callback:function($this,$td,dateString){
		},
		finish:function($input){
			
			
		},
		holidays:{
			"0101":"元旦节",
			"0214":"情人节",
			"0308":"妇女节",
			"0312":"植树节",
			"0315":"消费者权益日",
			"0401":"愚人节",
			"0501":"劳动节",
			"0504":"青年节",
			"0509":"郝维节",
			"0512":"护士节",
			"0601":"儿童节",
			"0701":"建党节,香港回归纪念",
			"0801":"建军节",
			"0808":"父亲节",
			"0816":"燕衔泥节",
			"0909":"毛泽东逝世纪念",
			"0910":"教师节",
			"0928":"孔子诞辰",
			"1001":"国庆节",
			"1006":"老人节",
			"1024":"联合国日",
			"1112":"孙中山诞辰纪念",
			"1220":"澳门回归纪念",
			"1225":"圣诞节",
			"1226":"毛泽东诞辰纪念"
		}

	};
	
	/*tip*/
	$.fn.tmTip = function(options){
		return this.each(function(){
			var opts = $.extend({},$.fn.tmTip.defaults,options,$.fn.tmTip.parseOptions($(this)));
			//if(opts.event=='hover'){
				$(this).hover(function(){
					tipInit($(this),opts);
				},function(){
					if(opts.event!='click'){
						$('.tm-tips').remove();
					}
				});
			//}
			
			if(opts.event=='click'){
				$(this).click(function(){
					tipInit($(this),opts);
				});
			}
			
			
			$(this).blur(function(){
				$('.tm-tips').remove();
			}).mouseleave(function(){
				$('.tm-tips').remove();
			});
		});
		
		function tipInit($this,opts){
			$('.tm-tips').remove();
			var content = opts.tip;
			if(opts.proxy)content = $this.find(opts.proxy).html();
			if(isEmpty(content))content = opts.title;
			if(isEmpty(content))content = $this.attr("placeholder");
			if(isEmpty(content))content = $this.text();
			if(isEmpty(content))content = "提示";
			$("body").append('<div class="tm-tips"><div class="tm-window-tip tooltip-nightly"><div id="tm-tip-content"></div></div><div class="tooltip-nightly-arrow"></div><div>');
			$('#tm-tip-content').css("textAlign",opts.contentAlign).html(content);//设置内容
			if(opts.width!=0){$(".tm-window-tip").css({width:opts.width});}/*设置高度如果高度设置为0：则为自动高度*/
			if(opts.height!=0){$(".tm-window-tip").css({height:opts.height});}/*设置高度如果高度设置为0：则为自动高度*/
			var _selfWidth = $(".tm-window-tip").width();//tip框的宽度
			var _selfHeight = $(".tm-window-tip").height();//tip框的高度
			var height = $this.height();/*元素自身高度*/
			var width = $this.width();/*元素自身宽度*/
			var offsetLeft = $this.offset().left;/*元素的相对左边距*/
			var offsetTop = $this.offset().top;/*元素的相对顶部距离*/
			var bodyWidth = $("body").innerWidth();
			var bodyHeight = $("body").innerHeight();
			var fixWidth = offsetLeft+_selfWidth+width;
			var fixHeight = offsetTop+_selfHeight+height;
			var left = 0;
			var top = 0;
			var arrowLeft = 0;
			var arrowTop = 0;
			
			/*如果offsetLeft=0的情况下*/
			if(offsetLeft==0 || offsetLeft<_selfWidth){
				if(opts.arrow=='rightTop')opts.arrow = "leftTop";
				if(opts.arrow=='rightMiddle')opts.arrow = "leftMiddle";
				if(opts.arrow=='rightBottom')opts.arrow = "leftBottom";
				if(opts.arrow=='topRight')opts.arrow = "topLeft";
				if(opts.arrow=='topMiddle')opts.arrow = "topLeft";
				if(opts.arrow=='bottomMiddle')opts.arrow = "bottomLeft";
				if(opts.arrow=='bottomRight')opts.arrow = "bottomLeft";
			}
			/*
			if(offsetTop==0 || offsetTop < _selfHeight){
				opts.arrow = "topMiddle";
			}*/
			
			if(fixWidth > bodyWidth ){
				if(opts.arrow=='topLeft')opts.arrow = "topRight";
				if(opts.arrow=='topMiddle')opts.arrow = "topRight";
				if(opts.arrow=='bottomMiddle')opts.arrow = "bottomRight";
				if(opts.arrow=='bottomLeft')opts.arrow = "bottomRight";
				if(opts.arrow=='leftTop')opts.arrow = "rightTop";
				if(opts.arrow=='leftMiddle')opts.arrow = "rightMiddle";
				if(opts.arrow=='leftBottom')opts.arrow = "rightBottom";
			}
			/*
			if(fixHeight > bodyHeight){
				opts.arrow = "bottomMiddle";
			}	*/
			
			
			if(opts.arrow=='topMiddle'){
				left = offsetLeft - _selfWidth/2+width/2  ;
				top = offsetTop+height+10;
				arrowLeft = offsetLeft+width/2-5 ;
				arrowTop = offsetTop +height;
			}
			
			if(opts.arrow=='topLeft'){
				left = offsetLeft + width/2;
				top = offsetTop+height+12;
				arrowLeft = offsetLeft+(width/2)+5;
				arrowTop = offsetTop +height+2;
			}
			
			if(opts.arrow=='topRight'){
				left = offsetLeft - _selfWidth+width/2;
				top = offsetTop+height+10;
				arrowLeft = offsetLeft+width/2-14;
				arrowTop = offsetTop +height ;
			}
			
			if(opts.arrow=='bottomLeft'){
				top = offsetTop-_selfHeight-13 ;
				left = offsetLeft +width/2;
				arrowLeft = offsetLeft+width/2+12 ;
				arrowTop = offsetTop-10;
			}
			
			if(opts.arrow=='bottomMiddle'){
				top = offsetTop-_selfHeight-13 ;
				left = offsetLeft - _selfWidth/2 +width/2 ;
				arrowLeft = offsetLeft+width/2-4 ;
				arrowTop = offsetTop-10;
			}
			
			if(opts.arrow=='bottomRight'){
				top = offsetTop-_selfHeight-13 ;
				left = offsetLeft -_selfWidth+width/2;
				arrowLeft = offsetLeft+width/2-18;
				arrowTop = offsetTop-10;
			}
			
			if(opts.arrow=='leftTop'){
				left = offsetLeft +width+14;
				top = offsetTop;
				arrowLeft = offsetLeft+width+2;
				arrowTop = offsetTop+6;
			}
			if(opts.arrow=='leftMiddle'){
				left = offsetLeft +width+10;
				top = offsetTop - _selfHeight/2+2;
				arrowLeft = offsetLeft+width-2;
				arrowTop = offsetTop;
			}
			if(opts.arrow=='leftBottom'){
				left = offsetLeft +width+12;
				top = offsetTop-_selfHeight+12;
				arrowLeft = offsetLeft+width;
				arrowTop = offsetTop-1;
			}
			
			if(opts.arrow=='rightTop'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop+5;
			}
			if(opts.arrow=='rightMiddle'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop - _selfHeight/2+2;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop;
			}
			if(opts.arrow=='rightBottom'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop - _selfHeight;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop-14;
			}
			if(!opts.hideArrow){
				$(".tooltip-nightly-arrow").addClass("tooltip-nightly-"+opts.arrow);
			}
			if(isEmpty(opts.arrow))opts.arrow = "bottomMiddle";
			var st = 2;
			if(opts.color=='ccc'){
				opts.border = "1px solid #CCC";
				opts.background = opts.background||"#A5A5A5";
				opts.fontColor = "#333";
				$(".tooltip-nightly-arrow").addClass("tooltip-nightly-"+opts.arrow+"-ccc");
			}else if(opts.color=='black'){
				opts.border = "1px solid #444";
				opts.background = opts.background||"#2B2B2B";
				$(".tooltip-nightly-arrow").addClass("tooltip-nightly-"+opts.arrow+"-black");
			}
			$(".tooltip-nightly-arrow").css({left:(arrowLeft+opts.offLeft),top:(arrowTop+opts.offTop)});
			$(".tm-window-tip").css({left:left+"px",top:(top+st),opacity:1,border:opts.border,background:opts.background,color:opts.fontColor});
			$('.tm-tips').click(function(){
				$(this).remove();
			});
		}	
	};

	$.fn.tmTip.parseOptions = function($target) {
		return {
			width : $target.attr("width"),
			height : $target.attr("height"),
			tip : $target.attr("tip"),
			title:$target.attr("title"),
			event:$target.attr("event"),
			arrow:$target.attr("arrow"),
			offLeft:$target.attr("offLeft"),
			offTop:$target.attr("offTop"),
			background:$target.attr("background"),
			border:$target.attr("border"),
			color:$target.attr("color"),
			proxy:$target.attr("proxy")
		};
	};
	$.fn.tmTip.defaults ={
		width : 0,//宽度
		height : 0,//高度如果为0则为自动高度
		title:"",//如果tip为空用title
		event:"hover",//触发的事件类型
		arrow:"bottomMiddle",
		hideArrow:false,//是否隐藏方向箭头
		background:"",//设置背景
		border:"2px solid #116497",
		proxy:"",
		tip : "",//内容
		contentAlign:"left",
		offLeft:0,//左部偏移
		offTop:0,//顶部移动
		color:"black"
	};
	
	
	var imgboxTimer = null;
	/*图集插件*/
	$.fn.tmImgbox = function(options){
		return this.each(function(){
			var opts = $.extend({},$.fn.tmImgbox.defaults,$.fn.tmImgbox.parseOptions($(this)),options);
			$(this).data("tmImgbox",{options:opts});
			initImgbox($(this));
			var src = $(this).attr("src");
			if(isEmpty(src))src = $(this).attr("_src");
			if(opts.suffix)src = src.replace(opts.suffix,"");
			opts.imgArrs.push(src);
		});
	};

	function initImgbox($this){
		var opts = $this.data("tmImgbox").options;
		$this.on(opts.eventType,function(e){
			stopBubble(e);
			var title = $(this).attr("title");
			if(isEmpty(title))title="";
			$("body").append('<div class="tm-ui-overdisplay" title="点击关闭图集"></div><div id="tm-box-wrap" style="display: block;  height: 468px;">'+
				'<div id="tm-box-outer">'+
					'<div class="tm-box-bg" id="tm-box-bg-n"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-ne"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-e"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-se"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-s"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-sw"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-w"></div>'+
					'<div class="tm-box-bg" id="tm-box-bg-nw"></div>'+
					'<div id="tm-box-content">'+
						'<img id="tm-box-imgs"  title="'+title+'"/>'+
					'</div>'+
					'<div id="tm-box-title" style=""><span id="tm-box-tit">'+title+'</span><span id="tm-box-timer" style="margin:5px;"><a href="javascript:void(0)" id="tm-auto-play">自动播放</a></span></div>' +
					'<a href="javascript:;" id="tm-box-left" style="display: block;"><span class="tm-box-ico" id="tm-box-left-ico"></span></a>'+
					'<a href="javascript:;" id="tm-box-right" style="display: block;"><span class="tm-box-ico" id="tm-box-right-ico"></span></a>'+
				'</div>'+
				'<a id="tm-box-close" class="tmui-box-close" style="display: inline;"></a>'+
			'</div>');
			$("#tm-box-imgs").css({height:0,width:0});
			var src = $(this).attr("src");
			if(isEmpty(src))src = $(this).attr("_src");
			if(isNotEmpty(opts.suffix))src=src.replace(opts.suffix,"");
			tmImgBoxLoading(src,opts);
			$("#tm-box-wrap").width(opts.width);
			$("#tm-box-content").width(opts.width-20).height(opts.height);
			var vheight = $(window).height();
			if(document.body.scrollHeight>$(window).height()){
				vheight = document.body.scrollHeight;
			}
			$(".tm-ui-overdisplay").height(vheight);
			//if(opts.drag)$.fn.Tmui.methods._moveAll($("#tm-box-wrap"),".tm-box-bg");
			if(opts.drag)$("#tm-box-wrap").tmDrag({handle:$(".tm-box-bg")});
			$(".tm-ui-overdisplay").click(function(){
				$("#tm-box-loading").remove();
				$(".tm-ui-overdisplay").fadeOut("fast",function(){
					$(this).remove();
				});
				$("#tm-box-wrap").remove();
				clearInterval(imgboxTimer);
			});
			
			$.fn.tmImgbox.methods.resizeImgbox($this);
			if(isNotEmpty(opts.top)){
				$("#tm-box-wrap").css("top",opts.top);
			}
			
			/*翻页控制*/
			var index = $.tmArray.indexOf(opts.imgArrs,$(this).attr("src"));
			var imgArr = opts.imgArrs;
			$("#tm-box-left").click(function(){
				clearInterval(imgboxTimer);
				if(index==0)index = imgArr.length;
				index--;
				tmImgBoxLoading(imgArr[index],opts);
			});
			
			$("#tm-box-right").click(function(){
				clearInterval(imgboxTimer);
				index++;
				if(index== imgArr.length)index = 0;
				tmImgBoxLoading(imgArr[index],opts);
			});
			
			$("#tm-auto-play").click(function(){
				var text = $(this).text();
				if(text=='自动播放')$(this).text("暂停播放");
				if(text=='暂停播放'){
					clearInterval(imgboxTimer);
					$(this).text("自动播放");
					return;
				}
				/*定时轮播*/
				imgboxTimer = setInterval(function(){
					index++;
					if(index == imgArr.length)index = 0;
					tmImgBoxLoading(imgArr[index],opts);
				},opts.time*1000);
			});
			/*翻页控制*/
		});
	};
	
	function tmImgBoxLoading(src,opts){
		var img = new Image();
		img.src = src;
		if(img.complete){
			tmImgBoxLoadingProxy(img,opts);
		}else{
			img.onreadystatechange = function () {
			};
			img.onload = function () {
				tmImgBoxLoadingProxy(img,opts);
			};
			img.onerror = function () {
				tmLoading("图片加载失败或没有找到...",1);
			};
		}
	};
	
	function tmImgBoxLoadingProxy(img,opts){
		$("#tm-box-loading").remove();
		var top = (getClientHeight() - opts.height) / 2;
		$("#tm-box-wrap").append('<div id="tm-box-loading" style="display:none; "><div style="top: -80px; "></div></div>');	
		var title = $("img[src='"+img.src+"']").attr("title");
		if(isEmpty(title)){
			title = $("*[_src='"+img.src+"']").attr("title");
		}
		$("#tm-box-loading").fadeIn(200,function(){
			$(this).hide();
			$("#tm-box-imgs").attr("src",img.src);
			$("#tm-box-tit").html(title);
			var width = img.width;
			var height = img.height;
			var bodyWidth = opts.width;
			var bodyHeight = opts.height;
			var box = $.fn.tmImgbox.methods.resizeImg(img,opts.bitWidth,opts.bitHeight);
			$("#tm-box-imgs").width(box.width).height(box.height);
			var width = $("#tm-box-imgs").width();
			var height = $("#tm-box-imgs").height();
			var left = (bodyWidth - width)/2-10;
			var top = (bodyHeight - height)/2 ;
			$("#tm-box-imgs").css({left:left,top:top});
		});
	}
	
	$.fn.tmImgbox.parseOptions = function($target) {
		return {
			
		}
	};
	
	$.fn.tmImgbox.methods = {
		loadImg : function(src,$img){
		      var o= new Image();
		      o.src = src;
		      if(o.complete){
		    	  $("#tm-box-loading").remove();
		    	  $img.attr("src",src);
		    	  $img.show();
		      }else{
		        o.onload = function(){
		          $("#tm-box-loading").remove();
		          $img.attr("src",src);
		          $img.show();
		        };
		        o.onerror = function(){
		        	tmLoading("图片加载失败或者图片没有找到",1);
		        };
		    }
		},
		
		resizeImg:function (img,iwidth,iheight){ 
		    var image= img;  
		    var boxWH = {};
		    if(image.width>0 && image.height>0){
		     	boxWH.width=image.width;
		     	boxWH.height=image.height;	    
		        if(boxWH.width>iwidth){    
		          	boxWH.height = (boxWH.height*iwidth)/boxWH.width;  
		            boxWH.width = iwidth;
		                 
		        }
		        if(boxWH.height>iheight){    
		          	boxWH.width = (boxWH.width*iheight)/boxWH.height;;   
		            boxWH.height = iheight;	             	 
		         }    	           
		    }   
		    return boxWH;
		} ,
		
		resizeImgbox:function($this){
			var bodyWidth = getClientWidth();
			//var bodyHeight = getClientHeight();
			var bodyHeight = $(window).height();
			var offset =$this.offset();
			var width = $("#tm-box-wrap").width();
			var height = $("#tm-box-wrap").height();
			var left = (bodyWidth - width)/2-15;
			var top = (bodyHeight - height)/2 - 30;
			$("#tm-box-wrap").css({left:left,top:top});
			$("#tm-box-wrap").find("#tm-box-close").click(function(){
				$(".tm-ui-overdisplay").fadeOut("fast",function(){
					$(this).remove();
				});
				$("#tm-box-wrap").remove();
				clearInterval(imgboxTimer);
			});
		}
	};
	
	$.fn.tmImgbox.defaults ={
		imgArrs:[],
		drag:true,
		width:960,
		height:420,
		bitWidth : 960,
		bitHeight: 550,
		eventType:"dblclick",
		suffix:"",//在实际开发的过程中，可能需要展示的是小图，而预览的时候看到的是大图片，比如:/images/aaa_small.jpg如果你填写了:"_small"--那么最终呈现的是/images/aaa.jpg
		time:2
	};
	/***********tmImgbox end**********/
	
	
	$.tmSlider = function(options){
		var opts = $.extend({},$.tmSlider.defaults,options);
		var $sliderBox = opts._template(opts);
		opts._init($sliderBox);
		opts._resize($sliderBox);
		opts.loadEvents($sliderBox);
		if(opts.loadSuccess)opts.loadSuccess($sliderBox.find("#contentmsg"));
		$sliderBox.find(".sliderbtn").click(function(){
			if(opts.callback)opts.callback($sliderBox.find("#sildercontent"),$sliderBox.find("#contentmsg"),$(this));
		});
		
		$sliderBox.on("click",".del",function(){
			if(opts.delCallback)opts.delCallback($(this));
		});
		
		$sliderBox.on("click",".reply",function(){
			if(opts.replyCallback)opts.replyCallback($(this));
		});
		
	}
	
	$.tmSlider.defaults = {
		_template : function(opts){
			if(!$("body").hasClass("containerbox")){
				var data = this._dataHtml(opts);
				var $sliderBox = $("<div class='containerbox animated bounceIn' id='containerbox'>"+
				"	  <a class='icon close'></a>"+
				"	  <div id='mainContent'>"+
				"		<div id='sidebar'>"+
				"			<div id='simgbox'></div>"+
				"			<div class='title'>"+
				"				<div class='tb fl'><img src='1.jpg' class='tmui-headerpic'/></div>"+
				"				<div class='tm fr'>"+
				"					<span><strong>keke老师</strong></span>"+
				"					<span>关注数:120 &nbsp;&nbsp;&nbsp;发帖数:200</span>"+
				"					<span>日期:2012/12月/12日 12:12:33</span>"+
				"				</div>"+
				"				<div class='tc fr'>"+
				"					<div class='fl' style='padding:10px;'><textarea class='tarea' id='sildercontent' placeholder='请输入评论内容'></textarea></div>"+
				"					<div class='fr' style='padding-right:8px'>"+
				"						<a href='javascript:void(0);' class='tmui-face'></a>"+
				"						<a href='javascript:void(0);' class='btn sliderbtn'>评论</a>"+
				"					</div>"+
				"				</div>"+
				"				<div class='tcc fl' id='contentbox'><ul id='contentmsg'></ul>"+
				"				</div>"+
				"			</div>"+
				"		</div>"+
				"	    <div id='sliderContent' style='position:relative'>"+
				"			<a href='javascript:void(0);' class='leftcursor'></a>"+
				"			<div id='imgbox'>"+
				"				<img id='img' src='"+data.img+"'/>"+
				"			</div>"+
				"			<a href='javascript:void(0);' class='rightcursor'></a>"+
				"			<div id='listbox'>"+
				"				<div style='position:relative'>"+
				"					<a href='javascript:void(0)' class='left'> < </a>"+
				"					<ul class='slidebar' id='slidebarbox'>"+data.html+"</ul>"+
				"					<a href='javascript:void(0)' class='right'> > </a>"+
				"				</div>"+
				"			</div>"+
				"		</div>"+
				"	  </div>"+
				"	</div>");
				$("body").append($sliderBox).append("<div class='tmui-overlay'></div>");
				return $sliderBox;
			}else{
				return $("#containerbox");
			}
		},
		
		_dataHtml : function(opts){
			var data = opts.datas;
			var jdata = {};
			var html = "",img="";
			if(data){
				var length = data.length;
				for(var i=0;i<length;i++){
					var flag = "";
					if(i==0){
						img = data[i].img;
						flag = "class='on'";
					}
					html +="<li "+flag+"><div class='avatar_slot'><img src='"+data[i].img+"'></div></li>";
				}
			}
			jdata.html = html;
			jdata.img = img;
			return jdata;
		},
		
		_imgBoxLoading : function(src,callback){
			var img = new Image();
			img.src = src;
			if(img.complete){
				callback(this);
			}else{
				img.onreadystatechange = function () {
				};
				img.onload = function () {
					callback(this);
				};
				img.onerror = function () {
					//alert("图片加载失败或没有找到...");
				};
			}
		},
		_resize :function($sliderBox){
			var $this = this;
			$(window).resize(function(){
				$this._init($sliderBox);
			});
		},
		_init : function($sliderBox){
			var $this = this;
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			$sliderBox.css({width:windowWidth-100,height:windowHeight-100});
			$this._position($sliderBox);
			var $img = $sliderBox.find("#img");
			$sliderBox.find("#contentbox").height(windowHeight-327);
			$this._imgBoxLoading($img.attr("src"),function(img){
				var box = $this.resizeImg($img.attr("src"),windowWidth-460,windowHeight-225);
				$img.width(box.width).height(box.height);
				$this._positionImg($("#imgbox"));
			});
			
			if(windowWidth<=480){
				$sliderBox.find("#simgbox").height(160).show().html("<img id='slideImg' height='160' width='300' src='"+$img.attr("src")+"'>");
				var $smallimg = $sliderBox.find("#slideImg");
				$sliderBox.css({top:20}).find("#contentbox").height(windowHeight-487);
			}else{
				$sliderBox.find("#simgbox").hide();
			}
		},
		_position : function($sliderBox){
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
			var dialogWidth = $sliderBox.width();
			var dialogHeight = $sliderBox.height();
			var left = (windowWidth-dialogWidth)/2;
			var top =  (windowHeight-dialogHeight)/2;
			$sliderBox.css({left:left,top:top});
		},
		_positionImg:function($sliderBox){
			var windowWidth = $("#sliderContent").width();
			var windowHeight = $("#sliderContent").height();
			var dialogWidth = $sliderBox.width();
			var dialogHeight = $sliderBox.height();
			var left = (windowWidth-dialogWidth)/2;
			var top =  (windowHeight-dialogHeight)/2;
			$sliderBox.css({left:left,top:top});
		},
		resizeImg : function(src,iwidth,iheight){ 
			var $this = this;
			var image=new Image();    
			image.src=src;
			var imgWidth = image.width;
			var imgHeight = image.height;
			var boxWH = {};
			if(imgWidth >0 && imgHeight>0){
				boxWH.width=imgWidth;
				boxWH.height=imgHeight;	    
				if(boxWH.width>iwidth){    
					boxWH.height = (boxWH.height*iwidth)/boxWH.width;  
					boxWH.width = iwidth;
						 
				}
				if(boxWH.height>iheight){    
					boxWH.width = (boxWH.width*iheight)/boxWH.height;;   
					boxWH.height = iheight;	             	 
				 }    	           
			} 
			return boxWH;			
			
			
		},
		loadEvents :function($sliderBox){
			//关闭事件调用
			$sliderBox.find(".close").click(function(){
				$sliderBox.next().remove();
				$sliderBox.addClass("animated bounceOut").fadeOut(1000,function(){
					$(this).remove();
				});
			});
			var num = 5;
			var index = 0;
			var num2 = Math.ceil(num / 2);
			var w1 = $sliderBox.find("#listbox").width();
			//li的个数
			var w2 = $sliderBox.find("#slidebarbox").find("li").width();
			var length  = $sliderBox.find("#slidebarbox").find("li").length;
			
			
			$sliderBox.find("#listbox .right,.rightcursor").click(function(){
				index ++;
		        index = index == length ? 0 : index;
		        Change();
			});
		
			$sliderBox.find("#listbox  .left,.leftcursor").click(function(){
				 index --;
		         index = index == -1 ? length -1 : index;
		         Change();
			});
		
			$sliderBox.find("#slidebarbox").find("li").click(function(){
				index = $(this).index();
		        Change();
			});
			
			var $this = this;
			function Change(){
				$sliderBox.find("#slidebarbox").stop(true,true);
				if(index < num2){
					$sliderBox.find("#slidebarbox").animate({"left":0});
				}else if(index + num2 <= length){
					$sliderBox.find("#slidebarbox").animate({left: - (index - num2 + 1) * w2});
				}else{
					$sliderBox.find("#slidebarbox").animate({left: - (length - num) * w2});
				}
				var $li = $sliderBox.find("#slidebarbox").find("li").eq(index);
				$li.addClass("on").siblings().removeClass("on");
				var isrc = $li.find("img").attr("src");
				$("#loadingimg").remove();
				$sliderBox.find("#imgbox").prepend("<img id='loadingimg' style='position:absolute;left:43%;top:40%;' src='loading.gif'>");
				var $img = $sliderBox.find("#img");
				$this._positionImg($("#imgbox"));
				var windowHeight = $(window).height();
				var windowWidth = $(window).width();
				$this._imgBoxLoading(isrc,function(img){
					$img.attr("src",isrc);
					$sliderBox.find("#loadingimg").remove();
					var box = $this.resizeImg(isrc,windowWidth-460,windowHeight-225);
					$img.width(box.width).height(box.height);
					$sliderBox.find("#slideImg").attr("src",isrc);
					$this._positionImg($("#imgbox"));
				});
			}
		}
	}
	
	$.tmCookie = {
		setCookie : function(name, value,time,option){
		    var str=name+'='+escape(value); 
		    var date = new Date();
		    date.setTime(date.getTime()+this.getCookieTime(time)); 
		    str += "; expires=" + date.toGMTString();
		    if(option){ 
		        if(option.path) str+='; path='+option.path; 
		        if(option.domain) str+='; domain='+option.domain; 
		        if(option.secure) str+='; true'; 
		    } 
		    document.cookie=str; 
		},
		getCookie : function(name){
			var arr = document.cookie.split('; '); 
		    if(arr.length==0) return ''; 
		    for(var i=0; i <arr.length; i++){ 
		        tmp = arr[i].split('='); 
		        if(tmp[0]==name) return unescape(tmp[1]); 
		    } 
		    return ''; 
		},
		delCookie : function(name){
			$.tmCookie.setCookie(name,'',-1); 
			var date=new Date();
	        date.setTime(date.getTime()-10000);
			document.cookie=name+"=; expire="+date.toGMTString()+"; path=/";
		},
		
		getCookieTime : function(time){
		   if(time<=0)return time;
		   var str1=time.substring(1,time.length)*1;
		   var str2=time.substring(0,1);
		   if (str2=="s"){
		        return str1*1000;
		   }
		   else if (str2=="m"){
		       return str1*60*1000;
		   }
		   else if (str2=="h"){
			   return str1*60*60*1000;
		   }
		   else if (str2=="d"){
		       return str1*24*60*60*1000;
		   }
		}
	};
	
	/*
	 * $(function(){
			$("body").snow({ 
				minSize: 5,		//雪花的最小尺寸
				maxSize: 45, 	//雪花的最大尺寸
				newOn: 10		//雪花出现的频率 这个数值越小雪花越多
			});
		});
	 * */
	$.fn.snow = function(options){
	
			var $flake 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
				documentHeight 	= $(document).height(),
				documentWidth	= $(document).width(),
				defaults		= {
									minSize		: 10,		//雪花的最小尺寸
									maxSize		: 20,		//雪花的最大尺寸
									newOn		: 1000,		//雪花出现的频率
									flakeColor	: "#FFFFFF"	//懒人建站 www.51xuediannao.com   整理
								},
				options			= $.extend({}, defaults, options);
			
			var interval = setInterval( function(){
				var startPositionLeft 	= Math.random() * documentWidth - 100,
				 	startOpacity		= 0.5 + Math.random(),
					sizeFlake			= options.minSize + Math.random() * options.maxSize,
					endPositionTop		= documentHeight - 40,
					endPositionLeft		= startPositionLeft - 100 + Math.random() * 500,
					durationFall		= documentHeight * 10 + Math.random() * 5000;
					$flake.clone().appendTo('body').css({
							left: startPositionLeft-180,
							opacity: startOpacity,
							'font-size': sizeFlake,
							color: options.flakeColor
						}).animate({
							top: endPositionTop,
							left: endPositionLeft-180,
							opacity: 0.2
						},durationFall,'linear',function(){
							$(this).remove()
						}
					);
					
			}, options.newOn);
	
	};
})(jQuery);

