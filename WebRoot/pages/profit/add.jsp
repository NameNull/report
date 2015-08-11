<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>收入页面-财务管理系统</title>
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
	    <!-- 左侧导航栏 -->	
	    <div id="sidebar">
	    	<%@include file="../../common/slider.jsp" %>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<div class="cheader">
	    		<p class="ta_title"><a href="profit/list">【返回列表】</a></p>
	    	</div>
	    	<!--表格-->
			<div id="contentbox">
				<input type="hidden" id="profitId" name="profit.id" value="${profit.id}">
				<form id="profitform" method="post">
				<div class="xt_right">
			     <div class="xtrt_nr">
			          <table style="width:100%">
			          <tr>
				          <td style="width:115px;">收入来源：</td>
				          <td>  
				          	<select data-old="${profit.typeId }" name="profit.typeId" id="typeId" class="text_box" style="width: 472px;">
				          		<option value="">--请选择收入类型--</option>
				          		<c:forEach var="map" items="${maps}">
				          			<option ${map.id==profit.typeId? 'selected':'' } value="${map.id}">${map.name}</option>
				          		</c:forEach>
				          	</select>
				          	<i class="red">*</i>
				          	<span class="errormessage red"></span>
				          </td>
			          </tr>
			          <tr>
			          <td style="width:115px;">收入金额：</td>
			          <td>
			          	<input data-old="${profit.money }" type="text" name="profit.money" value="${profit.money }" class="text_box" autofocus="autofocus" id="money" maxlength="10" placeholder="收入的金额"> <i class="red">*</i>
			          	<span class="errormessage red"></span>
			          </td>
			          </tr>
			          <tr>
			          <td style="width:115px;" style="vertical-align: top;">收入描述：</td>
			          <td><textarea data-old="${profit.description }" class="text_box" name="profit.description" id="description" maxlength="600" style="height: 200px;" placeholder="收入的描述">${profit.description }</textarea></td>
			          </tr>
			          <tr>
			          <td style="width:115px;"></td>
			          <td>
			          	<input type="button" onclick="tm_save(this)" class="text_btn" value="保存收入">
			          	<input type="button" onclick="window.location.href='profit/list'" class="text_btn" value="返回">
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
		function tm_validator(){
			var typeId = $("#typeId").val();
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
			if(isNaN(money)){
				$("#money").focus();
				$("#money").parent().find(".errormessage").html("金额需要为数字!");
				return false;
			}else{
				$("#money").parent().find(".errormessage").empty();
			}
			return true;
		}
		
		/*添加收入*/
		function tm_save(obj){
			if(!tm_validator())return;
			var typeId = $("#typeId").val();
			var money = $("#money").val();
			var description = $("#description").val();
			var params = {
				"profit.typeId":typeId,
				"profit.money":money,
				"profit.description":description
			};
			var id = $("#profitId").val();
			var method = "save";
			if(isNotEmpty(id)){
				var oldtypeId=$("#typeId").data("old");
				var oldmoney=$("#money").data("old");
				var olddesc=$("#description").data("old");
				params["profit.id"] = id;
				method = "update";
				if(typeId==oldtypeId && money==oldmoney && description==olddesc){
					alert("没有修改！");
					return;
				}
			}
			$(obj).removeAttr("onclick").val("数据保存中....");
			/* $.ajax({
				type:"post",
				url:basePath+"ajax/profit/"+method,
				data:params,
				error:function(){$(obj).attr("onclick","tm_save(this)").val("保存收入");alert("服务器异常！");},
				success:function(data){
					$(obj).attr("onclick","tm_save(this)").val("保存收入");
					if(data.result=="success"){
						window.location.href = basePath+"profit/list";
					}else{
						$("#money").val("").focus();
						alert("操作失败");
					}
				}
			}); */
			var options={
				url:basePath+"ajax/profit/"+method,
				data:params,
				error:function(){$(obj).attr("onclick","tm_save(this)").val("保存收入");alert("服务器异常！");},
				callback:function(data){
					$(obj).attr("onclick","tm_save(this)").val("保存收入");
					if(data.result=="success"){
						window.location.href = basePath+"profit/list";
					}else{
						$("#money").val("").focus();
						alert("操作失败");
					}
				}
			};
			$.yj_utils.yj_ajax(options);
		}
	</script>
  </body>
</html>