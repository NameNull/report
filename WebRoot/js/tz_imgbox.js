(function($){
	$.fn.tzImgbox = function(options){
		var opts = $.extend({},$.fn.tzImgbox.methods,$.fn.tzImgbox.defaults,options);
		this.each(function(){
			opts.init($(this),opts);
		});
	};
	
	$.fn.tzImgbox.defaults = {
		events :"hover",
		width:640,
		height:400,
		position:false
	}
	
	$.fn.tzImgbox.methods={ 
		init : function(imgObj,opts){
			var $this = this;
			if(opts.events =="hover"){
				imgObj.hover(function(){
					$this._template($(this),opts);
	  			},function(){
	  				$("#imgbox").remove();
	  			});
			}else{
				imgObj.on(opts.events,function(){
					$this._template($(this),opts);
				});
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
		_template : function(imgObj,opts){
			var $this = this;
			var imgSrc = imgObj.data("bigsrc");
			alert(imgObj.height());
			var top = imgObj.offset().top + imgObj.width()||0-1;
			var left = imgObj.offset().left + imgObj.height()||0-1;
			$this.loadImgSuccess(imgSrc,function(obj){
				var box = $this.resizeImg(imgSrc,opts.width,opts.height);
				$("#tmimgbox").remove();
				var $imgBox = $("<div id='tmimgbox' class='magictime foolishIn'><a href='javascript:void(0);' class='icon close'></a><div id='imgbox' class='imgbox'></div></div>");
				$("body").append($imgBox)//.append("<div class='tmui-overlay'></div>");
				$imgBox.find("#imgbox").html("<img src='"+imgSrc+"'  width='"+box.width+"' height='"+box.height+"'>");
				if(opts.position){
					$this._position($imgBox);
				}else{
					$imgBox.css({"left":left,"top":top});
				}
				
				$(".tmui-overlay").click(function(){
					$(this).remove();//关闭阴影层
					$("#tmimgbox").removeClass("foolishIn").addClass("margictime foolishOut").fadeOut("slow",function(){
						$(this).remove();
					});
				});
				
				$("#tmimgbox").find(".close").click(function(){
					$("#tmimgbox").next(".tmui-overlay").remove();//关闭阴影层
					$("#tmimgbox").removeClass("foolishIn").addClass("margictime foolishOut").fadeOut("slow",function(){
						$(this).remove();
					});
				});
				
				$(window).resize(function(){
					$this._position($imgBox);
				});
			});
			
			
			
		},
		loadImgSuccess : function(src,callback){
			var img = new Image();
			img.src = src;
			if(img.complete){//google firefox
				callback(this);
			}else{
				//ie
				img.onreadystatechange = function () {
					
				};
				img.onload = function () {//图片下载完毕了
					callback(this);
				};
				img.onerror = function () {//图片下在错误
					alert("图片加载失败或没有找到...");
						};
					}
				},
				resizeImg : function(src,iwidth,iheight){ 
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
				}
  			};
 
  		})(jQuery);