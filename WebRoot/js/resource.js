$(function(){
	//禁止文本窗口选中
	//tm_forbiddenSelect();
	//禁止浏览器的右键
	//document.body.oncontextmenu=document.body.ondragstart= document.body.onselectstart=document.body.onbeforecopy=function(){return false;};
	//工具类的高度是自动换算的
	$("#sidebar").height(getClientHeight()-103);
	//内容栏的高度是自动换算的
	$("#content").height(getClientHeight()-104);
	//这行是浏览器改变的时候自动的改变内容和工具栏的高度
	$(window).resize(function(){
		$("#sidebar").height(getClientHeight()-103);
		$("#content").height(getClientHeight()-104);
	});
	
	//动态绑定删除按钮事件的初始化
	tm_deleteresource2();
	//动态绑定编辑按钮和保存和取消男的事件初始化
	tm_bind_buttonsevent();
});


//批量删除元素
function tm_deleteResources(){
	var arr =[];
	$("#contentbox").find(".chk:checked").each(function(){
		arr.push($(this).val());
	});
	
	//一定判断是否有选择的元素
	if(arr.length==0){
		tm_dialoag({content:"请选择要删除的数据!"});
		return;
	}
	
//	$("#contentbox").find("input[type='checkbox'][name='ridchk']:checked").each(function(){
//		arr.push($(this).val());
//	});
	
	
//	$("#contentbox").find(".chk").each(function(){
//		if($(this).prop("checked")){
//			arr.push($(this).val());
//		}
//	});
	
//	$("#contentbox").find(".chk").filter(function(){
//		if($(this).prop("checked")){
//			arr.push($(this).val());
//		}
//	});
	
	tm_dialoag({content:"您确定批量删除您选中文件吗?",callback:function(ok){
		if(ok){
			$.ajax({
				type:"post",
				url:"/yunpan/service/deleteResources.jsp",
				data:{"ids":arr.toString()},
				success:function(data){
					var jdata = data.trim();
					if(jdata=="success"){
//						$("#contentbox").find(".chk:checked").each(function(){
//							$(this).parents(".items").slideUp("slow",function(){
//								$(this).remove();
//							});
//						});
						for(var i=0;i<arr.length;i++){
							$("#tm-items-"+arr[i]).slideUp("slow",function(){
								$(this).remove();
							});
						}
					}else{
						alert("删除失败!");
					}
				}
			});
		}
	}});
}

//绑定动态编辑文件名的事件
function tm_bind_buttonsevent(){
	//编辑事件
	$("#contentbox").find(".edit").click(function(){
		//获取修改的名字的框
		var $name = $(this).parents(".items").find(".name-text");
		//获取div里面的文本内容
		var text = $name.text();
		//隐藏当前的编辑按钮
		$(this).hide();
		//显示保存和取消按钮
		$(this).parents(".items").find(".tmui-btns").show();
		//给div加入一个输入框，并且把内容放入在input中
		$name.html("<input type='text' class='itemvalue' value='"+text+"'>&nbsp;&nbsp;<a href='javascript:void(0);' class='tmui-btns save'><img src='images/icon_ok.png'></a>&nbsp;&nbsp;<a href='javascript:void(0);' class='tmui-btns cancle'><img src='images/icon_close.png'></a>");
		//并且选中要修改的内容
		$name.find(".itemvalue").select();
	});

	//取消事件
	$("#contentbox").on("click",".cancle",function(){
		//获取name的对象
		var $this = $(this);
		//编辑按钮显示出来
		$this.parents(".items").find(".edit").show();
		//隐藏保存按钮和取消按钮给隐藏
		$this.parents(".items").find(".tmui-btns").hide();
		var $name = $this.parents(".items").find(".name-text");	
		//把title的值重新赋给div
		$name.html($name.attr("title"));
	});

	//保存事件
	$("#contentbox").on("click",".save",function(){
		//获取name的对象
		var $name = $(this).parents(".items").find(".name-text");	
		//获取文本框的内容
		var $input = $(this).parents(".items").find(".itemvalue");
		//获取文本框的内容
		var newValue = $input.val();
		//获取元素的标题
		var title = $name.attr("title");
		//这里如点击保存的时候如果没有发生任何的变化执行取消事件.
		if(newValue!="" && title == newValue){
			//trigger事件触发
			 $(this).parents(".items").find(".cancle").trigger("click");	//触发我们的取消事件
			return;
		}

		if(newValue!="" && newValue.length<100){
			var opid = $(this).parents(".items").data("opid");
			//执行一个ajax把新的文件名通过id去修改数据库的信息
			$(this).parents(".items").find(".tmui-btns").hide();
			$(this).parents(".items").find(".edit").show();
			$name.attr("title",newValue).html(newValue);
			$.ajax({
				type:"post",
				url:"/yunpan/service/updateResource.jsp",
				data:{"id":opid,"name":newValue},
				success:function(data){
					var result = data.trim();
					if(result =="success"){	
					}else{
						alert("修改失败...");
					}
				}
			});
		}else{
			alert("请输入文件名称或者文件名不得超过100");
		}
	});
};

//第一种方式删除
function tm_deleteresource(obj){
	var opid = $(obj).data("opid");
	//不管是任何的删除都要给确定提示，
	tm_dialoag({content:"您确定删除该文件吗?",callback:function(ok){
		if(ok){
			$.ajax({
				type:"post",
				url:"/yunpan/service/deleteResource.jsp",
				data:{"id":opid},
				success:function(data){
					var result = data.trim();
					if(result=="success"){
						 $(obj).parents(".items").slideUp("slow",function(){
							 $(this).remove();
						 });
					}else{
						alert("删除失败");
					}
				}
			});
		}
	}});
};

//第二种删除 动态绑定
function tm_deleteresource2(){
	//$(".delete").click(function(){
	//jquery里面的事件委托就是专门去处理ajax添加的后背元素的一种动态绑定事件的方式。解决了你实际开发过程重复
	$("#contentbox").on("click",".delete",function(){
		var $this = $(this);
		var opid = $this.data("opid");
		//不管是任何的删除都要给确定提示，
		tm_dialoag({content:"您确定删除该文件吗?",callback:function(ok){
			if(ok){
				$.ajax({
					type:"post",
					url:"/yunpan/service/deleteResource.jsp",
					data:{"id":opid},
					success:function(data){
						var result = data.trim();
						if(result=="success"){
							 $this.parents(".items").slideUp("slow",function(){
								 $(this).remove();
							 });
						}else{
							alert("删除失败");
						}
					}
				});
			}
		}});
	});
};

/*保存文件通用方法*/
function tm_saveresource(jdata){
	var name = jdata.name;
	var size = jdata.size;
	var sizeString  = jdata.sizeString;
	var newName = jdata.newName;
	var ext = jdata.ext;
	var url = jdata.url;
	var width = "100";//图片的宽度
	var height = "100";//图片的高度
	var description = "";//描述
	var folderId = 1;//对应的文件夹
	//参数设置
	var params = {
		"name":name,
		"newName":newName,
		"size":size,
		"url":url,
		"sizeString":sizeString,
		"ext":ext,
		"width":width,
		"height":height,
		"description":description,
		"folderId":folderId
	};
	
	//发送ajax
	$.ajax({
		type:"post",
		url:"/yunpan/service/resource.jsp",
		data:params,
		success:function(data){
			var result = data.trim();
			if(result=="fail"){
				tm_dialoag({title:"添加提示",width:340,height:200,content:"非常抱歉，文件添加失败!"});
			}else{
				var jdata = eval("("+result+")");
				var date = new Date();
				$("#contentbox").prepend("<li id='tm-items-"+jdata.id+"' class='items'>"+
					"		<div class='col c1' style='width: 50%;'>"+
			        "        <span class='fl icon'><input type='checkbox'  name='ridchk' value='"+jdata.id+"' class='chk fl'><img src='images/gif.png'></span>"+
			        "        <div class='name fl'><span class='name-text'>"+jdata.name+"</span></div>"+
			        "    </div>"+
			        "    <div class='col' style='width: 16%'>"+jdata.sizeString+"</div>"+
			        "    <div class='col' style='width: 23%;color:green;'>"+date.format("yyyy-MM-dd HH:mm:ss")+"（"+getTimeFormat(date)+"）</div>"+
			        "    <div class='col buttons' style='width: 10%'>"+
			        "    	<a href='javascript:void(0);'><img src='images/edit.png'></a>&nbsp;&nbsp;"+
// 				        "    	<a href='javascript:void(0);'  data-opid='"+jdata.id+"' onclick='tm_deleteresource(this);'><img src='images/delete.gif'></a>"+
			        "    	<a href='javascript:void(0);'  data-opid='"+jdata.id+"' class='delete'><img src='images/delete.gif'></a>"+
			        "    </div>"+
					"</li>");
					$("#content").height(getClientHeight()-105);
			}
		}
	});
}

/*上传组件调用方法*/
$.tmUpload({"fileTypes":"*.*",callback:function(data,file){
	var jdata = eval("("+data+")");
	tm_saveresource(jdata);
}});