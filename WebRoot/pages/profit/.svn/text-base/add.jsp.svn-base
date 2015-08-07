<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 通用标签的导入 -->
<%@include file="../../common/taglib.jsp" %>
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
	<%@include file="../../common/common.jsp" %>
	<style type="text/css">
		#content{position: relative;}
		.red{color: red;}
		.cheader{position: fixed;width: 100%;top:52px;z-index: 5;}
		#contentbox{overflow-y:auto;width: 100%; position:absolute;top: 42px; }
	</style>
  </head>
  <body>
  	<!-- 容器 -->
  	<div id="container">
  	  <!-- 头部 -->
	  <%@include file="../../common/header.jsp" %>
	  <!-- 中间内容 -->
	  <div id="mainContent">
	    <!-- 右侧导航栏 -->	
	    <div id="sidebar">
	    	<%@include file="../../common/slider.jsp" %>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<div class="cheader">
	    		<p class="ta_title"><a href="${basePath}/profit/list">【返回列表】</a>添加收入</p>
	    	</div>
	    	<!--表格-->
			<div id="contentbox">
				<input type="hidden" id="profitId" name="profitBean.id" value="${profitBean.id}">
				<form id="profitform" method="post">
				<div class="xt_right">
			     <div class="xtrt_nr">
			          <table width="100%" border="0" cellpadding="0" cellspacing="0">
			          <tr>
				          <td width="115">收入来源：</td>
				          <td>  
				          	<select name="profitBean.typeId" id="typeId" class="text_box">
				          		<option value="">--请选择收入类型--</option>
				          		<c:forEach var="pt" items="${maps}">
				          			<option ${pt.id==profitBean.typeId ? 'selected="selected"':''}   value="${pt.id}">${pt.name}</option>
				          		</c:forEach>
				          	</select>
				          	<i class="red">*</i>
				          	<span class="errormessage red"></span>
				          </td>
			          </tr>
			          <tr>
			          <td width="115">收入的金额：</td>
			          <td>
			          	<input type="text" name="profitBean.money" value="${profitBean.money}" class="text_box" autofocus="autofocus" id="money" maxlength="10" placeholder="请输入收入的金额"><i class="red">*</i>
			          	<span class="errormessage red"></span>
			          </td>
			          </tr>
			          <tr>
			          <td width="115" style="vertical-align: top;">收入描述：</td>
			          <td><textarea class="text_box" name="profitBean.description" id="description" maxlength="600" style="height: 200px;" placeholder="请输入收入的描述">${profitBean.description}</textarea></td>
			          </tr>
			          <tr>
			          <td width="115"></td>
			          <td>
			          	<input type="button" onclick="tm_save(this)" class="text_btn" value="保存收入">
			          	<input type="button" onclick="window.location.href='${basePath}/profit/list'" class="text_btn" value="返回">
			          </td>
			          </tr>
			          </table>
			     </div>
			</div>
			</form>
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
		
		
		
		//等整个项目做完的一会教大家如何去封装一个validator插件
		function tm_validator(){
			//类型
			var typeId = $("#typeId").val();
			//金额
			var money = $("#money").val();
			if(isEmpty(typeId)){
				$("#typeId").focus();
				$("#typeId").parent().find(".errormessage").html("请选择收入类型!");
				return false;
			}else{
				$("#typeId").parent().find(".errormessage").empty();
			}
			
			if(isEmpty(money)){
				$("#money").focus();
				$("#money").parent().find(".errormessage").html("请输入金额!");
				return false;
			}else{
				$("#money").parent().find(".errormessage").empty();
			}
			
			//isNaN 是javascript提供判别一个字符串是否是数字 isNaN(1) = false isNaN("s")=true
			if(isNaN(money)){
				$("#money").focus();
				$("#money").parent().find(".errormessage").html("金额是数字!");
				return false;
			}else{
				$("#money").parent().find(".errormessage").empty();
			}
			return true;
		}
		
		/*添加收入*/
		function tm_save(obj){
			if(!tm_validator())return;
			//类型
			var typeId = $("#typeId").val();
			//金额
			var money = $("#money").val();
			//描述
			var description = $("#description").val();
			var params = {
				"profitBean.typeId":typeId,
				"profitBean.money":money,
				"profitBean.description":description
			};
			//data:$("#profitform").serialize(),
			$(obj).removeAttr("onclick").val("数据保存中....");
			var id = $("#profitId").val();
			var method = "save";
			
			if(isNotEmpty(id)){//如果id不为空
				params["profitBean.id"] = id;
				method = "update";
			}
			
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/"+method,
				data:params,
				error:function(){$(obj).attr("onclick","tm_save(this)").val("保存收入");},
				success:function(data){
					$(obj).attr("onclick","tm_save(this)").val("保存收入");
					if(data.result=="success"){
						window.location.href =  basePath+"/profit/list";
					}else{
						$("#money").val("").focus();
						alert("添加失败");
					}
				}
			});
		}
	</script>
  </body>
</html>