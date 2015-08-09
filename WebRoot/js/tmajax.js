(function($){
	$.yj_utils={
		yj_ajax:function(options){
			var defaults={
				type:"post",
				error:function(){
					alert("服务器异常！");
				}
			};
			var opts=$.extend({},defaults,options);
			$.ajax({
				type:opts.type,
				url:opts.url,
				data:opts.data,
				beforeSend:opts.beforeSend,
				error:opts.error,
				success:function(data){
					if(data.result=="loginout"){
						location.href=basePath+"login";
					}else{
						if(opts.callback)opts.callback(data);
					}
				}
			});
		}
	};
})(jQuery);