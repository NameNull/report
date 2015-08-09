<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<ul id="ul">
 	<li class="profitlist selected"><a href="profit/list">收入明细</a></li>	
 	<li class="profitdetail"><a href="profit/detail">收入统计明细</a></li>
 	<li><a href="javascript:void(0);">支出明细</a></li>
	<li><a href="javascript:void(0);">支出统计明细</a></li>
</ul>
<script>
	var path="${pageContext.request.requestURL}";
	if(path.indexOf("profit/list")!=-1){
		$("#ul").find(".profitlist").addClass("selected").siblings().removeClass("selected");
	}else if(path.indexOf("profit/detail")!=-1){
		$("#ul").find(".profitdetail").addClass("selected").siblings().removeClass("selected");
	}
</script>