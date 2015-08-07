<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 通用标签的导入 -->
<%@include file="/common/taglib.jsp" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>收入页面-财务管理系统</title>
	<!-- 通用样式和JS的导入 -->
	<%@include file="/common/common.jsp" %>
	<style type="text/css">
		#content{position: relative;}
		.cheader{position: fixed;width: 100%;top:52px;z-index: 5;}
		#contentbox{overflow-y:auto;width: 100%; position:absolute;top: 42px; }
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
	    		<li class="menu_dropdown"><a href="javascript:void(0);">收入明细</a></li>
	    		<li class="selected">收入支出</li>
	    		<li>收入统计明细</li>
	    		<li>支出统计明细</li>
	    		<li>打印清单</li>
	    	</ul>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<div class="cheader"><p class="ta_title">收入信息录入</p></div>
	    	<!--表格-->
			<div id="contentbox">
				<div class="xt_right">
			     <div class="xtrt_nr">
			          <table width="100%" border="0" cellpadding="0" cellspacing="0">
			          <tr>
			          <td width="115">姓名：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">昵称：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">部门：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">性别：</td>
			          <td class="clearfix">
			              <div class="radio_sty"><a href="#" class="aselect icon"></a><p>男</p></div>
			              <div class="radio_sty"><a href="#" class="icon"></a><p>女</p></div>
			              <div class="radio_sty"><a href="#" class="icon"></a><p>保密</p></div>
			          </td>
			          </tr>
			          <tr>
			          <td width="115">年龄：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">出生日期：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">婚姻状况：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">目前所在地：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">户口所在地：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">工作年限：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">最高学历：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">专业：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">手机号码：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115">入职时间：</td>
			          <td><input type="text" class="text_box"></td>
			          </tr>
			          <tr>
			          <td width="115"></td>
			          <td><input type="button" class="text_btn" value="提交信息"></td>
			          </tr>
			          </table>
			     </div>
			</div>
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