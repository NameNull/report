<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="common/taglib.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>登陆页面</title>
<meta name="Keywords" content="潭州学院" />
<meta name="author" />
<meta name="Description" content="潭州学院" />
<style type="text/css">
	*{padding:0px;margin:0px}
	body { font-family:"微软雅黑"; font-size:14px; margin:0;}
	#container {margin:0 auto; width:100%;}
	#header { height:35%; margin-bottom:0px;position:relative;background:#141414}
	#mainContent { height:65%; background:#1C3024}
	.logo{position:absolute;bottom:20px;left:43.8%}
	.inputs{height:26px;width:180px;border-radius:2px;border:none;box-shadow:1px 1px 3px #fff}
	.box{position:relative;color:#fff;}
	.submit{background:#D8C4C4;padding:6px 15px;border:none;color:#fff;cursor:pointer}
	.btn{padding-left:412px;padding-top:12px;}
</style>
</head>
<body style="overflow:hidden;" >
<div id="container">
  <div id="header">
	<div class="logo"><img src="http://www.tanzhouedu.cn/images/logo.png"></div>
  </div>
  <div id="mainContent" style="text-align:center;">
	<div class="box">
		<div style="height:24px;"><span id="message"></span></div>
		<form action="login/logined" method="post">
			账号：${fieldErrors}
			${actionMessages}
			<input type="text" class="inputs" id="account" name="account" autofocus="autofocus" placeholder="请输入账号" maxLength="20">&nbsp;&nbsp;&nbsp;&nbsp;
			密码：<input type="password" class="inputs" id="password" name="password" placeholder="请输入密码" maxLength="20">
			<p class="btn"><input type="submit" id="loginbtn" class="submit" value="登陆"><p>
		</form>
	</div>
  </div>
</div>
<script type="text/javascript" src="${basePath}/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${basePath}/js/util.js"></script>
<script type="text/javascript">
	$(function(){
		$("#container").height($(window).height());
		//敲入键盘的enter建进行提交登陆
		$(document).keydown(function(e){
			if(e.keyCode == 13){
				//触发登陆按钮的事件
				$("#loginbtn").trigger("click");
			}
		});
		
// 		var arr = ["1.jpg","2.jpg","3.jpg","4.jpg"];
// 		var index = 0;
// 		setInterval(function(){
// 			if(index == arr.length)index = 0;
// 			$("body").css("background","url(images/"+arr[index]+")");
// 			index++;
// 		},5000);
	});
	
	//老师一切为了什么：防止用户重复提交
	//已定义减少和服务器端的交互---静态化
	function tm_login(obj){
		var account = $("#account").val();
		var password = $("#password").val();
		if(isEmpty(account)){
			$("#account").focus();
			tm_showmessage("请输入账号");
			return;
		}
		
		if(isEmpty(password)){
			$("#password").focus();
			tm_showmessage("请输入密码");
			return;
		}
		
		$(obj).parent().css("paddingLeft",387);
		$(obj).attr("value","登陆中...").removeAttr("onclick");
		$.ajax({
			type:"post",
			url:"service/userdao.jsp",
			error:function(){$(obj).attr("value","登陆").attr("onclick","tm_login(this)");},
			data:{"account":account,"password":password},
			success:function(data){
				var jdata = data.trim();
				if(jdata==="success"){
					window.location.href = "index.jsp";
				}else if(jdata=="empty"){
					tm_showmessage("请输入账号和密码!");
				}else{
					$("#account").select();
					$("#password").val("");
					$(obj).attr("value","登陆").attr("onclick","tm_login(this)");
					tm_showmessage("您输入账号和密码错误");
				}
			}
		});
	}
	
	//显示错误信息
	function tm_showmessage(message){
		$("#message").show().html(message).stop(true,true).fadeOut(3000);
	}
	
	
	
</script>
</body>
</html>
