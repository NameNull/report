<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
  <head>
  	<base href="<%=basePath%>">
    <title>Error Page</title>
	<link rel="shortcut icon" href="favicon.ico"  type="image/x-icon" />
  </head>
  <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="js/util.js"></script>
  <body>
    404页面不存在！<span id="count">5</span>秒后回到主页！
    <script type="text/javascript">
    	$(function(){
    		var count=$("#count").text();
    		var timer=null;
    		clearInterval(timer);
    		timer=setInterval(function(){
        		count--;
        		if(count<1){location.href="<%=basePath%>"+"index.jsp";}
        		if(count==0){count++;}
        		$("#count").text(count);
    		},1000);
    	});
    </script>
  </body>
</html>
