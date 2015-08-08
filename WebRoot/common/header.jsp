<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="header">
	<a href="/aboutHui.shtml" target="_blank" class="Hui_logo fl" title="H-ui前端框架">CMS-UI系统</a>
	<!-- <span class="subtitle fl">极简 · 免费 · 干净 </span>
	<div class="Hui_nav cl fl">
	    <ul>
	      <li id="Huinav_1"> <a href="javascript:void(0);">首页</a> </li>
	      <li id="Huinav_2"> <a href="javascript:void(0);">核心</a> </li>
	      <li id="Huinav_3"> <a href="javascript:void(0);">扩展</a> </li>
	      <li id="Huinav_4"> <a href="javascript:void(0);">案例</a> </li>
	    </ul>
	</div> -->
	<span class="btn_codeShare">
	${sessionScope.userSession.username }
    <a href="http://www.yjava.cn" target="_blank"  class="btn radius btn-success" >返回首页</a>
    <a href="login/exit" class="btn radius btn-success">退出登录</a></span>
</div>