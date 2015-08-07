<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 通用标签的导入 -->
<%@include file="/common/taglib.jsp" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>收入页面-潭州学院财务管理系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 通用样式和JS的导入 -->
	<%@include file="/common/common.jsp" %>
	<style type="text/css">
		#content{position: relative;}
		.cheader{position: fixed;width: 100%;top:52px;z-index: 5;}
		#contentbox{overflow-y:auto;width: 100%; position:absolute;top: 42px; }
		.tmui-buttons a{background:green;color:#fff;float: left;padding: 5px;}
	</style>
  </head>
  <body>
  	<!-- 容器 -->
  	<div id="container">
  	  <!-- 头部 -->
	  <%@include file="/common/header.jsp" %>
	  <!-- 中间内容 -->
	  <div id="mainContent">
	    <!-- 右侧导航栏 -->	
	    <div id="sidebar">
	    	<ul>
	    		<li class="menu_dropdown">
	    			<a href="javascript:void(0);">收入明细</a>
	    		</li>
	    		<li class="selected">收入支出</li>
	    		<li>收入统计明细</li>
	    		<li>支出统计明细</li>
	    		<li>打印清单</li>
	    	</ul>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<div class="cheader"><p class="ta_title">收入明细列表</p></div>
	    	<!--表格-->
			<div id="contentbox">
				<!--标题-->
				<!--日期-->
				<div class="ta_selete tmui-buttons">
					<a href="${basePath}/profit/addProfit">添加收入明细</a>
				</div>
				<!--表格-->
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
				  <tr class="ta_tr">
				    <td width="7%">ID</td>
				    <td width="15%">金额（元）</td>
				    <td width="15%">收入类型</td>
				    <td width="8%">收入者</td>
				    <td width="21%">收入时间</td>
				    <td width="19%">收入的描述</td>
				    <td width="15%">操作</td>
				  </tr>
				  <c:forEach var="profit" items="${profitBeans}">
					  <tr class="tmui-items">
					    <td>${profit.id}</td>
					    <td>￥${profit.money}</td>
					    <td>${profit.userId}</td>
					    <td>${profit.typeId}</td>
					    <td>profit.createTime</td>
					    <td>${profit.description}</td>
					    <td><a href="javascript:void(0)" onclick="tm_delete(this)" data-opid="${profit.id}">删除</a></td>
					  </tr>
				  </c:forEach>
				</table>
			</div>
	    </div><!-- 内容区域结束 -->
	  </div>
	</div>
	<script type="text/javascript">
		$(function(){
			var height = $(window).height();
			$("#sidebar").height(height-55);
			$("#contentbox").height(height-90);
			$(window).resize(function(){
				var height = $(this).height();
				$("#sidebar").height(height-55);
				$("#contentbox").height(height-90);
			});
		});
		function tm_delete(obj){
			//不管是什么删除一定要给提示，防止误操作
			tm_dialoag({content:"您确定删除吗?",callback:function(ok){
				if(ok){
					var opid = $(obj).data("opid");
					$.ajax({
						type:"post",
						url:"/report/json/delete/"+opid,
						success:function(data){
							if(data.result=="success"){
								$(obj).parents(".tmui-items").fadeOut("slow",function(){
									$(this).remove();
								});
							}else{
								alert("删除失败!");
							}
						}
					});
				}
			}});
		}
	</script>
  </body>
</html>