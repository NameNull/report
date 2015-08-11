<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="common/taglib.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="shortcut icon" href="favicon.ico"  type="image/x-icon" />
<title>登陆页面-财务管理系统</title>
<style type="text/css">
	*{padding:0px;margin:0px}
	body { font-family:"微软雅黑"; font-size:14px; margin:0;min-width:550px;}
	#container {margin:0 auto; width:100%;}
	#header { height:35%; margin-bottom:0px;position:relative;background:#141414}
	#mainContent { height:65%; background:#1C3024}
	.logo{position:absolute;bottom:20px;left:30%;width:40%;text-align:center;color:#fff;font-size:36px;}
	.inputs{height:26px;width:180px;border-radius:2px;border:none;padding-left:4px;outline:0;}
	.box{position:relative;color:#fff;}
	.submit{background:#fff;width:70px;height:30px;line-height:30px;border:none;color:#1C3024;cursor:pointer;font-weight:700;}
	.submit:hover{background:#EEB}
	.btn{padding-left:400px;padding-top:12px;}
</style>
</head>
<body style="overflow:hidden;" >
<div id="container">
  <div id="header">
	<div class="logo">财务管理系统</div>
  </div>
  <div id="mainContent" style="text-align:center;">
	<div class="box">
		<div style="height:24px;"><span id="message"></span></div>
		账号：<input type="text" class="inputs" id="account" name="account" autofocus="autofocus" placeholder="账号" maxLength="20">&nbsp;&nbsp;&nbsp;&nbsp;
		密码：<input type="password" class="inputs" id="password" name="password" placeholder="密码" maxLength="20">
			<p class="btn"><input type="submit" id="loginbtn" class="submit" onclick="tm_login(this)" value="登陆"><p>
	</div>
  </div>
</div>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript">
	var basePath="${basePath}";
	$(function(){
		$("#container").height($(window).height());
		$(document).keydown(function(e){
			if(e.keyCode == 13){
				$("#loginbtn").trigger("click");
			}
		});
	});
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
		$(obj).attr("value","登陆中...").removeAttr("onclick");
		$.ajax({
			type:"post",
			url:basePath+"ajax/loginValidate",
			error:function(){$(obj).attr("value","登陆").attr("onclick","tm_login(this)");alert("数据请求超时");},
			data:{"account":account,"password":password},
			success:function(data){
				if(data.result==="success"){
					window.location.href = "profit/list";
				}else{
					$("#account").select();
					$("#password").val("");
					$(obj).attr("value","登陆").attr("onclick","tm_login(this)");
					tm_showmessage("您输入账号或密码错误");
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
