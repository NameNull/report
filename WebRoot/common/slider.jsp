<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<ul id="ul">
 	<li class="profitlist selected">收入明细</li>	
 	<li class="profitdetail">收入统计明细</li>
 	<li>支出明细</li>
	<li>支出统计明细</li>
</ul>
<script>
	var path="${pageContext.request.requestURL}";
	if(path.indexOf("profit/list")!=-1){
		$("#ul").find(".profitlist").addClass("selected").siblings().removeClass("selected");
	}else if(path.indexOf("profit/detail")!=-1){
		$("#ul").find(".profitdetail").addClass("selected").siblings().removeClass("selected");
	}
	$("#ul").find("li").each(function(index){
		$(this).click(function(){
			if(index==0){
				location.href=basePath+"profit/list";
			}else if(index==1){
				location.href=basePath+"profit/detail";
			}else{
				
			}
		});
	});
</script>