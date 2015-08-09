<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 通用标签的导入 -->
<%@include file="/common/taglib.jsp" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>收入页面-财务管理系统</title>
	<%@include file="/common/common.jsp" %>
	<script type="text/javascript" src="js/jquery.pagination.js"></script>
	<style type="text/css">
		#content{position: relative;}
		.cheader{position: fixed;width: 100%;top:52px;z-index: 5;min-width:650px;}
		#contentbox{overflow-y:auto;width: 100%; position:absolute;top: 42px; min-width:670px;}
		.tmui-buttons a{background:green;color:#fff;float: left;padding: 5px;}
		#typeId{padding:5px;}
		.range{width: 60px;}
	</style>
  </head>
  <body>
  	<!-- 容器 -->
  	<div id="container">
  	  <!-- 头部 -->
	  <%@include file="/common/header.jsp" %>
	  <!-- 中间内容 -->
	  <div id="mainContent">
	    <!-- 左侧导航栏 -->	
	    <div id="sidebar">
	    	<%@include file="/common/slider.jsp" %>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<div class="cheader">
	    		<p class="ta_title fl">收入明细列表</p>
	    		<p class="totalNum">共<span id="totalNum">${count}</span>条结果</p>
	    	</div>
	    	<!--表格-->
			<div id="contentbox">
				<!--标题-->
				<!--日期-->
				<div class="ta_selete tmui-buttons">
					<div class="fl"><a class="fl" href="profit/add">添加收入明细</a> </div>
					<div class="fr">
						&nbsp;&nbsp;类型：
						<select id="typeId" onchange="tm_searchProfit()">
							<option value="">--所有类型--</option>
			          		<c:forEach items="${maps}" var="map">
			          			<option value="${map.id}">${map.name}</option>
			          		</c:forEach>
						</select>
						&nbsp;&nbsp;&nbsp;&nbsp;
						金额范围：
						<input type="text" id="minMoney" class="range"> ~
						<input type="text" id="maxMoney" class="range" > 
						<input type="button" class="search" onclick="tm_searchProfit()" value="搜 索">
					</div>
				</div>
				<!--表格-->
				<table style="width:100%"   class="table">
				  <thead>
					  <tr class="ta_tr">
					    <td style="width:3%" >序号</td>
					    <td style="width:12%">金额（元）</td>
					    <td style="width:8%" >收入类型</td>
					    <td style="width:21%">更新时间</td>
					    <td style="width:21%">收入时间</td>
					    <td style="width:19%">收入的描述</td>
					    <td style="width:15%">操作</td>
					  </tr>
				  </thead>
				  <tbody id="tbody">
				 	<jsp:include page="listTemplate.jsp"></jsp:include>
				  </tbody>
				</table>
				<div class="page" style="margin-top: 5px;float: right;"></div>
			</div>
	    </div><!-- 内容区域结束 -->
	  </div>
	</div>
	<script type="text/javascript">
		var totalCount = $("#totalNum").text();
		$(function(){
			var height = $(window).height();
			$("#sidebar").height(height-55);
			$("#contentbox").height(height-90);
			$(window).resize(function(){
				var height = $(this).height();
				$("#sidebar").height(height-55);
				$("#contentbox").height(height-90);
			});
			
			//初始化分页
			tm_initPage(totalCount);
		});
		
		function tm_initPage(itemCount){
			$(".page").pagination(itemCount, {
				num_display_entries : 3, //主体页数
				num_edge_entries : 4,//边缘页数
				current_page : 0,//指明选中页码
				items_per_page : 10, //每页显示多条条
				prev_text : "首页",
				next_text : "尾页",
				showGo:true,//控制是否显示go 页 ,默认是true
				showSelect:true,//控制是否现在下拉框 默认是true
				callback : function(pageNum, pageSize) {//会回传两个参数一个当前页，显示的页数
					//执行一个ajax分页就大功告成了....
					//执行模板数据回调的方法
					tm_loadTemplate(pageNum, pageSize); 
				}
			});
		}
		
		//搜索
		function tm_searchProfit(){
			tm_loadTemplate(0,10,function(itemCount){
				tm_initPage(itemCount);//搜索以后重新初始化分页
			});
		}
		
		//加载数据模板
		function tm_loadTemplate(pageNum,pageSize,callback){
			var typeId = $("#typeId").val();
			var maxMoney = $("#maxMoney").val();
			var minMoney = $("#minMoney").val();
			var typeName = $("#typeId").find("option:selected").text();
			if(isNotEmpty(maxMoney) && isNotEmpty(minMoney) && maxMoney*1 < minMoney*1){
				alert("最小金额不能大于最大金额");
				$("#maxMoney").select();
				return ;
			}
			if(isNaN(maxMoney)||isNaN(minMoney)){
				alert("金额必须是数字");
				return;
			}
			if(maxMoney*1>2147483647||minMoney*1<-2147483648){
				alert("金额为整型");
				return;
			}
			$.ajax({
				type:"post",
				url:basePath+"profit/listTemplate",
				data:{"startIndex":pageNum*pageSize,"pageSize":pageSize,"typeId":typeId,"maxMoney":maxMoney,"minMoney":minMoney},
				success:function(data){
					$("#tbody").html(data);
					keyHighlighter(typeName);
					if(callback){
						var itemCount =$("#itemCount").val();
						$("#totalNum").text(itemCount);
						callback(itemCount);
					}
				}
			});
		};
		
		//删除收入记录
		function tm_delete(obj){
			//不管是什么删除一定要给提示，防止误操作
			tm_dialog({content:"您确定删除吗?",callback:function(ok){
				if(ok){
					var opid = $(obj).data("opid");
					$.ajax({
						type:"post",
						url:basePath+"ajax/profit/delProfit/"+opid,
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